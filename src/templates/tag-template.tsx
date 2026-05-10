import * as React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
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

    return (
        <Layout
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <div className="max-w-5xl mx-auto">
                <Meta title={`${t("nav.tags")} - ${pageContext.tag}`} />
                <h1 className="text-3xl font-bold block mb-8 mt-12 flex items-center">
                    <TagIcon />
                    <span className="ml-2">{pageContext.tag}</span>
                </h1>
                <ul>
                    {data.posts.nodes.map((post) => (
                        <li key={post.id} className="text-base mb-4">
                            <div className="text-2xl">
                                <Link
                                    to={localizePath(
                                        `/posts/${
                                            post.frontmatter!.slug || ""
                                        }`,
                                        locale
                                    )}
                                >
                                    {post.frontmatter!.title}
                                </Link>
                            </div>
                            <div className="text-gray-400 dark:text-gray-700 italic">
                                {formatDate(post.frontmatter!.date, locale)}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
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
