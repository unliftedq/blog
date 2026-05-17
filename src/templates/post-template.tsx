import * as React from "react";
import { Link, graphql } from "gatsby";
import _ from "lodash";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { Reveal } from "../components/Reveal";
import { TagIcon } from "../components/TagIcon";
import { Locale, localizePath, useTranslation } from "../i18n";
import { formatDate } from "../utils/date";

interface PostItemTemplateProps {
    data: GatsbyTypes.PostItemQuery;
    pageContext: {
        locale: Locale;
        alternatePaths?: Partial<Record<Locale, string>>;
        hasTranslation?: boolean;
    };
    children: React.ReactNode;
}

const PostTemplate = ({
    data: { mdx },
    pageContext,
    children,
}: PostItemTemplateProps) => {
    const { locale, t } = useTranslation();
    if (mdx === null) {
        return null;
    }

    const otherLocale: Locale = locale === "zh" ? "en" : "zh";
    const translationPath =
        pageContext.hasTranslation && pageContext.alternatePaths
            ? pageContext.alternatePaths[otherLocale]
            : undefined;

    const title = mdx.frontmatter?.title ?? "";
    const tags = mdx.frontmatter?.tags ?? [];
    const banner = mdx.frontmatter?.banner ?? "";
    const date = mdx.frontmatter?.date;

    return (
        <Layout
            activeNavItem="posts"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
            showFooterCta
        >
            <Meta
                title={title}
                description={mdx.frontmatter?.excerpt || ""}
                type="article"
                extras={[
                    {
                        name: "keywords",
                        content: (mdx.frontmatter?.keywords || []).join(","),
                    },
                ]}
            />

            <article className="px-6 md:px-10">
                {/* Header: aligned to the article column (max-w-3xl) so it
                    stays in the same vertical rhythm as the body. */}
                <div className="mx-auto max-w-3xl pt-2 md:pt-6">
                    <Reveal className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-slate-soft mb-10">
                        <Link
                            to={localizePath("/posts", locale)}
                            className="inline-flex items-center gap-2 hover:text-amber-500 transition-colors"
                        >
                            <span aria-hidden>&larr;</span>
                            {t("post.backToIndex")}
                        </Link>
                    </Reveal>

                    <Reveal delay={1}>
                        <h1
                            className="font-display font-medium tracking-[-0.02em] leading-[1.05] text-ink-900 dark:text-cream-50"
                            style={{
                                fontSize: "clamp(1.875rem, 3.6vw, 3.25rem)",
                            }}
                        >
                            {title}
                        </h1>
                    </Reveal>

                    <Reveal
                        delay={2}
                        className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-slate-soft"
                    >
                        <span>{formatDate(date, locale)}</span>
                        {tags.length > 0 && (
                            <>
                                <span aria-hidden className="opacity-50">
                                    &middot;
                                </span>
                                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                                    {tags.map((tag) => (
                                        <li key={tag}>
                                            <Link
                                                to={localizePath(
                                                    `/tags/${_.kebabCase(
                                                        tag || ""
                                                    )}`,
                                                    locale
                                                )}
                                                className="inline-flex items-center gap-1.5 hover:text-amber-500 transition-colors"
                                            >
                                                <TagIcon />
                                                <span>{tag}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Reveal>

                    {translationPath && (
                        <Reveal
                            delay={3}
                            className="mt-8 flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-2.5 text-sm text-ink-600 dark:text-cream-200"
                        >
                            <span className="block size-1.5 rounded-full bg-amber-500" />
                            <span>{t("post.translationAvailable")}</span>
                            <Link
                                to={translationPath}
                                className="text-amber-500 underline underline-offset-4 hover:text-amber-400"
                            >
                                {t("post.viewTranslation")}
                            </Link>
                        </Reveal>
                    )}
                </div>

                {/* Banner — aligned to the article column so it never
                    exceeds the body width. */}
                {banner && (
                    <Reveal as="image" className="mx-auto max-w-3xl mt-12 md:mt-16">
                        <div className="overflow-hidden rounded-xl border border-ink-900/10 dark:border-cream-50/10 aspect-[16/9] bg-cream-100 dark:bg-ink-800">
                            <img
                                src={banner}
                                alt=""
                                aria-hidden="true"
                                className="size-full object-cover cinematic"
                            />
                        </div>
                    </Reveal>
                )}

                {/* Body — same column as header, generous spacing only at the top. */}
                <div className="mx-auto max-w-3xl pt-12 md:pt-16 pb-24 md:pb-32">
                    <div className="prose-editorial max-w-none">
                        {children}
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export const pageQuery = graphql`
    query PostItem($id: String!) {
        mdx(id: { eq: $id }) {
            id
            frontmatter {
                date
                excerpt
                keywords
                slug
                tags
                title
                banner
            }
            fields {
                lang
                translationKey
            }
        }
    }
`;

export default PostTemplate;
