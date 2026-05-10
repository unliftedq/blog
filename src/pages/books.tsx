import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
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
    const books = data.books.edges.map((item) => item.node.childMdx);

    return (
        <Layout
            activeNavItem="books"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <div className="max-w-5xl mx-auto">
                <Meta title={t("books.title")} />
                <h1 className="text-3xl font-bold block mb-8 mt-12">
                    {t("books.title")}
                </h1>
                {books.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                        {t("books.empty")}
                    </p>
                ) : (
                    <ul className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                        {books.map((book) => (
                            <li key={book!.id}>
                                <a
                                    href={localizePath(
                                        `/books/${book?.frontmatter?.slug}`,
                                        locale
                                    )}
                                >
                                    <div className="rounded overflow-hidden shadow-lg dark:bg-gray-700 hover:dark:text-gray-300">
                                        <img
                                            className="w-full"
                                            src={
                                                book?.frontmatter?.cover || ""
                                            }
                                            alt={
                                                book?.frontmatter?.name || ""
                                            }
                                        />
                                        <div className="px-6 py-4">
                                            <div className="font-bold text-xl mb-2">
                                                {book?.frontmatter?.name}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
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
