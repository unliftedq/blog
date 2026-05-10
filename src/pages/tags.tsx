import React from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { Locale, localizePath, useTranslation } from "../i18n";

interface TagsPageProps {
    data: GatsbyTypes.TagsPageQuery;
    pageContext: {
        locale?: Locale;
        alternatePaths?: Partial<Record<Locale, string>>;
    };
}

export default ({ data, pageContext }: TagsPageProps) => {
    const { locale, t } = useTranslation();
    const tags = data.tags.group;

    return (
        <Layout
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <div className="max-w-5xl mx-auto">
                <Meta title={t("tags.title")} />
                <h1 className="text-3xl font-bold block mb-8 mt-12">
                    {t("tags.title")}
                </h1>
                {tags.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                        {t("tags.empty")}
                    </p>
                ) : (
                    <ul>
                        {tags.map((tag: any) => (
                            <li
                                key={tag.fieldValue}
                                className="float-left mr-6 my-2 font-semibold"
                            >
                                <Link
                                    className="text-blue-400 hover:text-blue-800"
                                    to={localizePath(
                                        `/tags/${_.kebabCase(tag.fieldValue)}`,
                                        locale
                                    )}
                                >
                                    {tag.fieldValue} ({tag.totalCount})
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
};

export const query = graphql`
    query TagsPage($locale: String) {
        tags: allMdx(filter: { fields: { lang: { eq: $locale } } }) {
            group(field: { frontmatter: { tags: SELECT } }) {
                fieldValue
                totalCount
            }
        }
    }
`;
