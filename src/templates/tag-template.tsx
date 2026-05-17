import * as React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { Reveal } from "../components/Reveal";
import { TagIcon } from "../components/TagIcon";
import { Locale, localizePath, useTranslation } from "../i18n";
import { formatDate } from "../utils/date";

interface TaggedPostsPageProps {
    data: GatsbyTypes.PostsByTagQuery;
    pageContext: {
        tag: string;
        locale: Locale;
        alternatePaths?: Partial<Record<Locale, string>>;
    };
}

const TagTemplate = ({ data, pageContext }: TaggedPostsPageProps) => {
    const { locale, t } = useTranslation();
    const posts = data.posts.nodes;

    return (
        <Layout
            activeNavItem="tags"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <Meta title={`${t("nav.tags")} - ${pageContext.tag}`} />

            <section className="px-6 md:px-10">
                <div className="mx-auto max-w-7xl pt-8 md:pt-16 pb-16 md:pb-24">
                    <Reveal className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-slate-soft mb-6 flex items-center gap-3">
                        <Link
                            to={localizePath("/tags", locale)}
                            className="inline-flex items-center gap-2 hover:text-amber-500 transition-colors"
                        >
                            <span aria-hidden>&larr;</span>
                            {t("nav.tags")}
                        </Link>
                        <span>·</span>
                        <span>{posts.length}</span>
                    </Reveal>
                    <Reveal delay={1} className="flex items-baseline gap-4">
                        <TagIcon />
                        <h1
                            className="font-display font-medium tracking-[-0.02em] leading-[0.95] text-ink-900 dark:text-cream-50"
                            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
                        >
                            {pageContext.tag}
                        </h1>
                    </Reveal>
                </div>
                <div className="mx-auto max-w-7xl hairline" />
            </section>

            <section className="px-6 md:px-10 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <ul className="divide-y divide-ink-900/10 dark:divide-cream-50/10">
                        {posts.map((post, i) => (
                            <Reveal
                                key={post.id}
                                tag="li"
                                delay={(Math.min(i, 4) as 0 | 1 | 2 | 3 | 4)}
                            >
                                <Link
                                    to={localizePath(
                                        `/posts/${
                                            post.frontmatter?.slug || ""
                                        }`,
                                        locale
                                    )}
                                    className="group grid grid-cols-1 md:grid-cols-12 gap-4 py-8"
                                >
                                    <div className="md:col-span-2 font-mono text-[0.72rem] tracking-[0.18em] uppercase text-slate-soft">
                                        {formatDate(
                                            post.frontmatter?.date,
                                            locale
                                        )}
                                    </div>
                                    <div className="md:col-span-9 font-display text-2xl md:text-3xl tracking-tight text-ink-900 dark:text-cream-50 group-hover:text-amber-500 transition-colors">
                                        {post.frontmatter?.title}
                                    </div>
                                    <div className="md:col-span-1 md:text-right text-amber-500 transition-transform duration-300 group-hover:translate-x-1">
                                        &rarr;
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </section>
        </Layout>
    );
};

export const query = graphql`
    query PostsByTag($tag: String, $locale: String) {
        posts: allMdx(
            filter: {
                frontmatter: { tags: { in: [$tag] } }
                fields: { lang: { eq: $locale } }
            }
            sort: { frontmatter: { date: DESC } }
        ) {
            nodes {
                id
                frontmatter {
                    slug
                    title
                    date
                }
            }
        }
    }
`;

export default TagTemplate;
