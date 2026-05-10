import React from "react";
import { Helmet } from "react-helmet-async";
import { useStaticQuery, graphql } from "gatsby";

import { htmlLang, useLocale } from "../i18n";

export interface MetaProps {
    title: string;
    description?: string;
    lang?: string;
    extras?: Array<{ name?: string; property?: string; content: string }>;
    image?: string;
    type?: "website" | "article";
}

export const Meta: React.FC<MetaProps> = ({
    title,
    description = "",
    lang,
    extras = [],
    type = "website",
    image = "",
}) => {
    const locale = useLocale();
    const resolvedLang = lang ?? htmlLang[locale];

    const { site } = useStaticQuery<GatsbyTypes.SiteMetaQuery>(
        graphql`
            query SiteMeta {
                site {
                    siteMetadata {
                        title
                        siteUrl
                        description
                        social {
                            twitter
                        }
                    }
                }
            }
        `
    );

    const _description = description || site?.siteMetadata?.description || "";
    const defaultTitle = site?.siteMetadata?.title;
    const thumbnail_url =
        image && site?.siteMetadata?.siteUrl && !/^(http|https)/.test(image)
            ? `${site.siteMetadata.siteUrl}${image}`
            : image;

    return (
        <Helmet>
            {/* Document metadata */}
            <html lang={resolvedLang} />
            <title>{title}</title>
            {defaultTitle && (
                <meta
                    name="titleTemplate"
                    content={`${defaultTitle} | %s`}
                />
            )}
            <meta name="description" content={_description} />

            {/* Favicon */}
            <link
                rel="icon"
                type="image/png"
                href="/images/favicon-32x32.png"
            />

            {/* Open Graph metadata */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={_description} />
            <meta property="og:type" content={type} />
            <meta property="og:locale" content={resolvedLang.replace("-", "_")} />
            {thumbnail_url && (
                <meta property="og:image" content={thumbnail_url} />
            )}

            {/* Twitter Card metadata */}
            <meta name="twitter:card" content="summary" />
            <meta
                name="twitter:creator"
                content={site?.siteMetadata?.social?.twitter || ""}
            />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={_description} />

            {/* Additional meta tags */}
            {extras.map((extra, index) => (
                <meta key={index} {...extra} />
            ))}
        </Helmet>
    );
};
