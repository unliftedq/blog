import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { useTranslation } from "../i18n";

export const Footer = () => {
    const year = new Date().getFullYear();
    const { t } = useTranslation();
    useStaticQuery<GatsbyTypes.SiteAuthorQuery>(
        graphql`
            query SiteAuthor {
                site {
                    siteMetadata {
                        author {
                            name
                        }
                    }
                }
            }
        `
    );

    return (
        <footer className="text-base mt-32 text-gray-400 dark:text-gray-600">
            <div className="max-w-5xl text-center m-auto">
                <p>{t("footer.rights", { year })}</p>
                <p
                    dangerouslySetInnerHTML={{
                        __html: t("footer.poweredBy", {
                            gatsby: `<a class="text-blue-400 hover:text-blue-800" href="https://www.gatsbyjs.com">Gatsby</a>`,
                        }),
                    }}
                />
            </div>
        </footer>
    );
};
