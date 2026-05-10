import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { Reveal } from "../components/Reveal";
import { Locale, localizePath, useTranslation } from "../i18n";
import { formatDate } from "../utils/date";

interface PostsPageProps {
    data: GatsbyTypes.PostsPageQuery;
    pageContext: {
        locale?: Locale;
        alternatePaths?: Partial<Record<Locale, string>>;
    };
}

type Post = NonNullable<
    NonNullable<
        GatsbyTypes.PostsPageQuery["posts"]["edges"][number]["node"]["childMdx"]
    >
>;

const groupByYear = (items: Post[]) => {
    const map = new Map<string, Post[]>();
    items.forEach((post) => {
        const date = post.frontmatter?.date ?? "";
        const year = date ? date.slice(0, 4) : "—";
        const list = map.get(year) ?? [];
        list.push(post);
        map.set(year, list);
    });
    return Array.from(map.entries()).sort(([a], [b]) => (a < b ? 1 : -1));
};

export default ({ data, pageContext }: PostsPageProps) => {
    const { locale, t } = useTranslation();
    const items = data.posts.edges
        .map((e) => e.node.childMdx)
        .filter(Boolean) as Post[];
    const grouped = groupByYear(items);

    return (
        <Layout
            activeNavItem="posts"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
            showFooterCta
        >
            <Meta title={t("posts.title")} />

            <section className="px-6 md:px-10">
                <div className="mx-auto max-w-7xl pt-8 md:pt-16 pb-16 md:pb-24">
                    <Reveal className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-slate-soft">
                        {t("nav.posts")} / {items.length}
                    </Reveal>
                    <Reveal delay={1} className="mt-6">
                        <h1
                            className="font-display font-medium tracking-[-0.02em] leading-[0.95] text-ink-900 dark:text-cream-50 max-w-5xl"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                        >
                            {t("posts.title")}
                        </h1>
                    </Reveal>
                </div>
                <div className="mx-auto max-w-7xl hairline" />
            </section>

            <section className="px-6 md:px-10 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    {items.length === 0 ? (
                        <p className="text-slate-soft">{t("posts.empty")}</p>
                    ) : (
                        <div className="space-y-20">
                            {grouped.map(([year, list]) => (
                                <div
                                    key={year}
                                    className="grid grid-cols-1 md:grid-cols-12 gap-8"
                                >
                                    <div className="md:col-span-3">
                                        <div
                                            className="font-display font-medium leading-none text-ink-900 dark:text-cream-50 sticky top-32"
                                            style={{
                                                fontSize:
                                                    "clamp(2rem, 4.5vw, 4rem)",
                                            }}
                                        >
                                            {year}
                                        </div>
                                    </div>
                                    <ul className="md:col-span-9 divide-y divide-ink-900/10 dark:divide-cream-50/10">
                                        {list.map((post, i) => (
                                            <Reveal
                                                key={post.id}
                                                tag="li"
                                                delay={
                                                    (Math.min(i, 4) as 0
                                                        | 1
                                                        | 2
                                                        | 3
                                                        | 4)
                                                }
                                            >
                                                <Link
                                                    to={localizePath(
                                                        `/posts/${
                                                            post.frontmatter
                                                                ?.slug || ""
                                                        }`,
                                                        locale
                                                    )}
                                                    className="group block py-8"
                                                >
                                                    <div className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-slate-soft mb-3">
                                                        {formatDate(
                                                            post.frontmatter
                                                                ?.date,
                                                            locale
                                                        )}
                                                    </div>
                                                    <h2
                                                        className="font-display font-medium tracking-[-0.02em] leading-[1.1] text-ink-900 dark:text-cream-50 group-hover:text-amber-500 transition-colors"
                                                        style={{
                                                            fontSize:
                                                                "clamp(1.5rem, 3vw, 2.5rem)",
                                                        }}
                                                    >
                                                        {
                                                            post.frontmatter
                                                                ?.title
                                                        }
                                                    </h2>
                                                    {post.frontmatter
                                                        ?.excerpt && (
                                                        <p className="mt-4 max-w-2xl text-ink-600 dark:text-cream-200 leading-relaxed">
                                                            {
                                                                post
                                                                    .frontmatter
                                                                    .excerpt
                                                            }
                                                        </p>
                                                    )}
                                                    <div className="mt-5 inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.18em] uppercase text-ink-900 dark:text-cream-50 group-hover:text-amber-500 transition-colors">
                                                        {t("common.readMore")}
                                                        <span
                                                            aria-hidden
                                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                                        >
                                                            &rarr;
                                                        </span>
                                                    </div>
                                                </Link>
                                            </Reveal>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export const query = graphql`
    query PostsPage($locale: String) {
        posts: allFile(
            filter: {
                sourceInstanceName: { eq: "posts" }
                childMdx: { fields: { lang: { eq: $locale } } }
            }
            sort: { childMdx: { frontmatter: { date: DESC } } }
        ) {
            edges {
                node {
                    childMdx {
                        id
                        frontmatter {
                            slug
                            title
                            date
                            excerpt
                        }
                    }
                }
            }
        }
    }
`;
