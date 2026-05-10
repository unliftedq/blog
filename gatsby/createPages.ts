import _ from "lodash";
import path from "path";

import {
    defaultLocale,
    Locale,
    locales,
    localizePath,
} from "../src/i18n/config";

const postTemplate = path.resolve(`./src/templates/post-template.tsx`);
const bookTemplate = path.resolve(`./src/templates/book-template.tsx`);
const tagTemplate = path.resolve(`./src/templates/tag-template.tsx`);

type GatsbyArgs = {
    graphql: <T = any>(query: string) => Promise<{ data?: T; errors?: any }>;
    actions: any;
    reporter: any;
};

export const createPages = async (args: GatsbyArgs) => {
    await createPostItemPage(args);
    await createBookPage(args);
    await createTaggedListPage(args);
};

const buildAlternatePaths = (basePath: string): Record<Locale, string> => {
    const alternatePaths = {} as Record<Locale, string>;
    for (const locale of locales) {
        alternatePaths[locale] =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
    }
    return alternatePaths;
};

const createPostItemPage = async ({ graphql, actions, reporter }: GatsbyArgs) => {
    const { createPage } = actions;

    const result = await graphql<{
        allFile: {
            edges: Array<{
                node: {
                    childMdx: {
                        id: string;
                        fields: {
                            lang: Locale | null;
                            translationKey: string | null;
                        } | null;
                        frontmatter: {
                            date: string;
                            slug: string;
                        } | null;
                        internal: { contentFilePath: string };
                    } | null;
                };
                previous: { childMdx: { id: string } | null } | null;
                next: { childMdx: { id: string } | null } | null;
            }>;
        };
    }>(`
        query PostItems {
            allFile(
                filter: {
                    sourceInstanceName: { eq: "posts" }
                    childMdx: { id: { ne: null } }
                }
                sort: { childMdx: { frontmatter: { date: DESC } } }
            ) {
                edges {
                    node {
                        childMdx {
                            id
                            fields {
                                lang
                                translationKey
                            }
                            frontmatter {
                                date
                                slug
                            }
                            internal {
                                contentFilePath
                            }
                        }
                    }
                    previous {
                        childMdx {
                            id
                        }
                    }
                    next {
                        childMdx {
                            id
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            result.errors
        );
        return;
    }

    const items = result.data!.allFile.edges;
    if (items.length === 0) return;

    // Build a translationKey -> { locale -> path } map.
    const translationIndex: Record<string, Partial<Record<Locale, string>>> = {};
    for (const item of items) {
        const post = item.node.childMdx;
        if (!post || !post.frontmatter || !post.fields) continue;
        const { translationKey, lang } = post.fields;
        const { slug } = post.frontmatter;
        const postLang = (lang || defaultLocale) as Locale;
        if (translationKey && slug) {
            translationIndex[translationKey] =
                translationIndex[translationKey] ?? {};
            translationIndex[translationKey]![postLang] = localizePath(
                `/posts/${slug}`,
                postLang
            );
        }
    }

    items.forEach((item) => {
        const post = item.node.childMdx;
        if (!post || !post.frontmatter || !post.fields) return;

        const postLang = (post.fields.lang || defaultLocale) as Locale;
        const slug = post.frontmatter.slug;
        if (!slug) return;
        const basePath = `/posts/${slug}`;
        const localizedPath = localizePath(basePath, postLang);

        const previousPostId = item.previous?.childMdx?.id;
        const nextPostId = item.next?.childMdx?.id;

        const translationPaths =
            (post.fields.translationKey &&
                translationIndex[post.fields.translationKey]) ||
            {};

        // For non-current locales, point to the explicit translation if present;
        // otherwise fall back to the posts index of that locale.
        const alternatePaths = {} as Record<Locale, string>;
        for (const locale of locales) {
            alternatePaths[locale] =
                translationPaths[locale] ??
                (locale === postLang
                    ? localizedPath
                    : localizePath("/posts", locale));
        }

        const otherLocale: Locale = postLang === "zh" ? "en" : "zh";

        createPage({
            path: localizedPath,
            component: `${postTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
            context: {
                id: post.id,
                previousPostId,
                nextPostId,
                locale: postLang,
                alternatePaths,
                hasTranslation: Boolean(translationPaths[otherLocale]),
            },
        });
    });
};

const createBookPage = async ({ graphql, actions, reporter }: GatsbyArgs) => {
    const { createPage } = actions;

    const result = await graphql<{
        allFile: {
            edges: Array<{
                node: {
                    childMdx: {
                        id: string;
                        fields: { lang: Locale | null } | null;
                        frontmatter: {
                            date: string;
                            slug: string;
                        } | null;
                        internal: { contentFilePath: string };
                    } | null;
                };
            }>;
        };
    }>(`
        query BookItems {
            allFile(
                filter: {
                    sourceInstanceName: { eq: "books" }
                    childMdx: { id: { ne: null } }
                }
            ) {
                edges {
                    node {
                        childMdx {
                            id
                            fields {
                                lang
                            }
                            frontmatter {
                                date
                                slug
                            }
                            internal {
                                contentFilePath
                            }
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading your books`,
            result.errors
        );
        return;
    }

    const items = result.data!.allFile.edges;
    items.forEach((item) => {
        const book = item.node.childMdx;
        if (!book || !book.frontmatter) return;

        const bookLang = (book.fields?.lang || defaultLocale) as Locale;
        const slug = book.frontmatter.slug;
        if (!slug) return;
        const basePath = `/books/${slug}`;
        const localizedPath = localizePath(basePath, bookLang);

        const alternatePaths = {} as Record<Locale, string>;
        for (const locale of locales) {
            alternatePaths[locale] =
                locale === bookLang ? localizedPath : localizePath("/books", locale);
        }

        createPage({
            path: localizedPath,
            component: `${bookTemplate}?__contentFilePath=${book.internal.contentFilePath}`,
            context: {
                id: book.id,
                locale: bookLang,
                alternatePaths,
            },
        });
    });
};

const createTaggedListPage = async ({
    graphql,
    actions,
    reporter,
}: GatsbyArgs) => {
    const { createPage } = actions;

    const result = await graphql<{
        allMdx: {
            group: Array<{
                fieldValue: string;
                nodes: Array<{
                    fields: { lang: Locale | null } | null;
                }>;
            }>;
        };
    }>(`
        query TagsByLocale {
            allMdx {
                group(field: { frontmatter: { tags: SELECT } }) {
                    fieldValue
                    nodes {
                        fields {
                            lang
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading post tags`,
            result.errors
        );
        return;
    }

    const groups = result.data!.allMdx.group;

    groups.forEach((group) => {
        // Determine which locales actually have posts under this tag.
        const localesWithPosts = new Set<Locale>();
        group.nodes.forEach((node) => {
            const lang = (node.fields?.lang || defaultLocale) as Locale;
            localesWithPosts.add(lang);
        });

        if (localesWithPosts.size === 0) return;

        const slug = _.kebabCase(group.fieldValue);
        const basePath = `/tags/${slug}`;
        const alternatePaths = buildAlternatePaths(basePath);

        localesWithPosts.forEach((locale) => {
            createPage({
                path: localizePath(basePath, locale),
                component: tagTemplate,
                context: {
                    tag: group.fieldValue,
                    locale,
                    alternatePaths,
                },
            });
        });
    });
};
