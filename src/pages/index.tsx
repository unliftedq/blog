import React from "react";
import { graphql, Link } from "gatsby";

import { Layout } from "../components/Layout";
import { Meta } from "../components/Meta";
import MdxRenderer from "../components/MdxRenderer";
import { Locale, localizePath, useTranslation } from "../i18n";
import { formatDate } from "../utils/date";

interface HomePageProps {
    data: GatsbyTypes.HomePageQuery;
    pageContext: {
        locale?: Locale;
        alternatePaths?: Partial<Record<Locale, string>>;
    };
}

export default ({ data, pageContext }: HomePageProps) => {
    const { locale, t } = useTranslation();

    return (
        <Layout
            activeNavItem="home"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <div className="max-w-5xl mx-auto">
                <Meta title={t("nav.home")} />
                <h1 className="text-5xl font-bold block mb-8 mt-12">
                    {t("home.greeting")}
                </h1>
                <div className="text-3xl block mb-12 text-gray-600 dark:text-gray-300">
                    {t("home.subtitle")}
                </div>
                <div></div>
                <div>
                    <h2 className="text-3xl font-bold block mb-4">
                        {t("home.latestPosts")}
                    </h2>
                    <div className="text-xl block">
                        {t("home.browseByTags.before")}
                        <Link
                            className="text-blue-400 hover:text-blue-800"
                            to={localizePath("/tags", locale)}
                        >
                            {t("home.browseByTags.link")}
                        </Link>
                        {t("home.browseByTags.after")}
                    </div>
                    <ul className="mt-4">
                        {data.posts.edges
                            .map((item) => item.node.childMdx)
                            .map((post) => (
                                <li key={post!.id} className="text-base mb-6">
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
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="mt-16">
                    <h2 className="text-3xl font-bold block mb-4">
                        {t("home.projects")}
                    </h2>
                    <ul className="mt-4">
                        {data.projects.nodes
                            .map((item) => item.childMdx)
                            .map((post) => (
                                <li key={post!.id} className="text-base mb-6">
                                    <div className="text-2xl font-semibold">
                                        <a
                                            href={
                                                post!.frontmatter!
                                                    .projectUrl || ""
                                            }
                                        >
                                            {post!.frontmatter!.name}
                                        </a>
                                    </div>
                                    <div className="text-gray-600 mt-2 dark:text-gray-400">
                                        <MdxRenderer
                                            content={post!.body || ""}
                                        />
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query HomePage($locale: String) {
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
                        }
                    }
                }
            }
        }

        projects: allFile(
            filter: {
                sourceInstanceName: { eq: "projects" }
                childMdx: {
                    fields: { lang: { eq: $locale } }
                    frontmatter: { pinToHomePage: { eq: true } }
                }
            }
            sort: { childMdx: { frontmatter: { name: DESC } } }
        ) {
            nodes {
                childMdx {
                    id
                    body
                    frontmatter {
                        name
                        projectUrl
                    }
                }
            }
        }
    }
`;
