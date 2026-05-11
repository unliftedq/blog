import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { Reveal } from "../components/Reveal";
import { Locale, localizePath, useTranslation } from "../i18n";

interface BooksPageProps {
    data: GatsbyTypes.BooksPageQuery;
    pageContext: {
        locale?: Locale;
        alternatePaths?: Partial<Record<Locale, string>>;
    };
}

export default ({ data, pageContext }: BooksPageProps) => {
    const { locale, t } = useTranslation();
    const books = data.books.edges
        .map((item) => item.node.childMdx)
        .filter(Boolean) as NonNullable<
        (typeof data.books.edges)[number]["node"]["childMdx"]
    >[];

    return (
        <Layout
            activeNavItem="books"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <Meta title={t("books.title")} />

            <section className="px-6 md:px-10">
                <div className="mx-auto max-w-7xl pt-8 md:pt-16 pb-16 md:pb-24">
                    <Reveal className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-slate-soft">
                        {books.length} {t("books.countLabel")}
                    </Reveal>
                    <Reveal delay={1} className="mt-6">
                        <h1
                            className="font-display font-medium tracking-[-0.02em] leading-[0.95] text-ink-900 dark:text-cream-50 max-w-5xl"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                        >
                            {t("books.title")}
                        </h1>
                    </Reveal>
                </div>
                <div className="mx-auto max-w-7xl hairline" />
            </section>

            <section className="px-6 md:px-10 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    {books.length === 0 ? (
                        <p className="text-slate-soft">{t("books.empty")}</p>
                    ) : (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                            {books.map((book, i) => (
                                <Reveal
                                    key={book!.id}
                                    tag="li"
                                    delay={(Math.min(i, 4) as 0 | 1 | 2 | 3 | 4)}
                                >
                                    <Link
                                        to={localizePath(
                                            `/books/${
                                                book?.frontmatter?.slug || ""
                                            }`,
                                            locale
                                        )}
                                        className="group block"
                                    >
                                        <div className="overflow-hidden rounded-xl border border-ink-900/10 dark:border-cream-50/10 mb-5 aspect-[3/4] bg-cream-100 dark:bg-ink-800">
                                            {book?.frontmatter?.cover ? (
                                                <img
                                                    src={
                                                        book.frontmatter
                                                            .cover || ""
                                                    }
                                                    alt={
                                                        book.frontmatter
                                                            ?.name || ""
                                                    }
                                                    className="size-full object-cover cinematic transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="size-full flex items-center justify-center font-display text-3xl text-slate-soft p-6 text-center">
                                                    {book?.frontmatter?.name}
                                                </div>
                                            )}
                                        </div>
                                        <h2 className="font-display font-medium text-xl md:text-2xl tracking-tight text-ink-900 dark:text-cream-50 group-hover:text-amber-500 transition-colors">
                                            {book?.frontmatter?.name}
                                        </h2>
                                        <div className="mt-3 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-slate-soft group-hover:text-amber-500 transition-colors">
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
                    )}
                </div>
            </section>
        </Layout>
    );
};

export const query = graphql`
    query BooksPage($locale: String) {
        books: allFile(
            filter: {
                sourceInstanceName: { eq: "books" }
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
                            name
                            cover
                        }
                    }
                }
            }
        }
    }
`;
