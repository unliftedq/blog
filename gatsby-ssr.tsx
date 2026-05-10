import * as React from "react";
import type { GatsbySSR } from "gatsby";

export { wrapPageElement } from "./src/wrapPageElement";

/**
 * Inject premium font preconnect + stylesheet links into <head>.
 * Cabinet Grotesk via Fontshare; Geist + Geist Mono via Google Fonts.
 */
export const onRenderBody: GatsbySSR["onRenderBody"] = ({
    setHeadComponents,
    setHtmlAttributes,
}) => {
    setHtmlAttributes({ lang: "en" });
    setHeadComponents([
        <link
            key="preconnect-fonts-google"
            rel="preconnect"
            href="https://fonts.googleapis.com"
        />,
        <link
            key="preconnect-fonts-gstatic"
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
        />,
        <link
            key="preconnect-fontshare"
            rel="preconnect"
            href="https://api.fontshare.com"
            crossOrigin="anonymous"
        />,
        <link
            key="font-geist"
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
        />,
        <link
            key="font-cabinet"
            rel="stylesheet"
            href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800,900,400&display=swap"
        />,
    ]);
};
