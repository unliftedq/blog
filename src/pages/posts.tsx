import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { Locale, localizePath, useTranslation } from "../i18n";
import { formatDate } from "../utils/date";

interface PostsPageProps {
    data: GatsbyTypes.PostsPageQuery;
    pageContext: {
        locale?: Locale;
        alternatePaths?: Partial<Record<Locale, string>>;
    };
}

export default ({ data, pageContext }: PostsPageProps) => {
    const { locale, t } = useTranslation();
    const items = data.posts.edges.map((item) => item.node.childMdx);

    return (
        <Layout
            activeNavItem="posts"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <div className="max-w-5xl mx-auto">
                <Meta title={t("posts.title")} />
                <h1 className="text-3xl font-bold block mb-8 mt-12">
                    {t("posts.title")}
                </h1>
                {items.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                        {t("posts.empty")}
                    </p>
                ) : (
                    <ul>
                        {items.map((post) => (
                            <li key={post!.id} className="text-base mb-8">
                                <div className="text-2xl">
                                    <Link
                                        to={localizePath(
                                            `/posts/${
                                                post!.frontmatter!.slug || ""
                                            }`,
                                            locale
                                        )}
                                    >
                                        {post!.frontmatter!.title}
                                    </Link>
                                </div>
                                <div className="text-gray-400 dark:text-gray-700 italic">
                                    {formatDate(
                                        post!.frontmatter!.date,
                                        locale
                                    )}
                                </div>
                                <div className="text-gray-600 mt-2 dark:text-gray-400">
                                    {post!.frontmatter!.excerpt}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
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
