import * as React from "react";
import { Link, graphql } from "gatsby";
import _ from "lodash";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
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

    return (
        <Layout
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <div className="max-w-5xl mx-auto">
                <Meta
                    title={mdx.frontmatter!.title || ""}
                    description={mdx.frontmatter!.excerpt || ""}
                    type="article"
                    extras={[
                        {
                            name: "keywords",
                            content: (mdx.frontmatter!.keywords || []).join(
                                ","
                            ),
                        },
                    ]}
                />
                <div className="prose xl:prose-xl dark:prose-invert dark:xl:prose-dark-xl max-w-none">
                    <h1 className="mb-0 xl:mb-2">{mdx.frontmatter?.title}</h1>
                    <ul className="list-none flex flex-wrap p-0 xl:p-0 my-0 xl:my-0">
                        {(mdx.frontmatter!.tags || []).map((tag) => (
                            <li key={tag} className="flex-none ml-0 mr-4">
                                <Link
                                    to={localizePath(
                                        `/tags/${_.kebabCase(tag || "")}`,
                                        locale
                                    )}
                                >
                                    <div className="flex flex-row items-center">
                                        <TagIcon />
                                        <span className="ml-1">{tag}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="text-gray-400 dark:text-gray-700 italic mb-12">
                        {formatDate(mdx.frontmatter!.date, locale)}
                    </div>
                    {translationPath && (
                        <div className="not-prose mb-8 p-3 rounded border border-blue-100 bg-blue-50 dark:border-blue-900 dark:bg-blue-950 text-sm text-gray-700 dark:text-gray-300">
                            {t("post.translationAvailable")}
                            <Link
                                to={translationPath}
                                className="text-blue-500 hover:text-blue-700 underline"
                            >
                                {t("post.viewTranslation")}
                            </Link>
                        </div>
                    )}
                    {children}
                </div>
            </div>
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
            }
            fields {
                lang
                translationKey
            }
        }
    }
`;

export default PostTemplate;
