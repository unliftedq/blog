import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { Locale, useTranslation } from "../i18n";

interface AboutPageProps {
    data: GatsbyTypes.AboutPageQuery;
    pageContext: {
        locale?: Locale;
        alternatePaths?: Partial<Record<Locale, string>>;
    };
}

export default ({ data, pageContext }: AboutPageProps) => {
    const { t } = useTranslation();
    const githubUrl = `github.com/${data.site?.siteMetadata?.social?.github}`;
    const twitterUrl = `twitter.com/${data.site?.siteMetadata?.social?.twitter}`;
    const email = data.site?.siteMetadata?.author?.email;

    return (
        <Layout
            activeNavItem="about"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <div className="max-w-5xl mx-auto">
                <Meta title={t("about.title")} />
                <h1 className="text-5xl font-bold block text-center mb-14">
                    {t("about.title")}
                </h1>
                <div className="prose xl:prose-xl dark:prose-invert dark:xl:prose-dark-xl max-w-none">
                    <p>{t("about.body.p1")}</p>
                    <p>{t("about.body.p2")}</p>
                    <p>{t("about.body.p3")}</p>

                    <h2 className="text-center">{t("about.getInTouch")}</h2>
                    <div>
                        <ul className="text-center list-none">
                            <li>
                                <a href={`mailto:${email}`}>{email}</a>
                            </li>
                            <li>
                                <a href={`https://${githubUrl}`}>{githubUrl}</a>
                            </li>
                            <li>
                                <a href={`https://${twitterUrl}`}>
                                    {twitterUrl}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query AboutPage {
        site {
            siteMetadata {
                author {
                    name
                    email
                }
                social {
                    github
                    twitter
                }
            }
        }
    }
`;
