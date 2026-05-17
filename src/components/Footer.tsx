import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

import { localizePath, useTranslation } from "../i18n";

interface FooterProps {
    /**
     * When true, render the calm "Read all posts" CTA above the bottom row.
     * Only used on the home page, the writing index, and post detail pages.
     */
    showCta?: boolean;
}

export const Footer = ({ showCta = false }: FooterProps) => {
    const year = new Date().getFullYear();
    const { locale, t } = useTranslation();
    const data = useStaticQuery<GatsbyTypes.SiteAuthorQuery>(
        graphql`
            query SiteAuthor {
                site {
                    siteMetadata {
                        social {
                            github
                            twitter
                        }
                    }
                }
            }
        `
    );

    const github = data.site?.siteMetadata?.social?.github ?? "";
    const twitter = data.site?.siteMetadata?.social?.twitter ?? "";

    return (
        <footer className="relative mt-32 md:mt-40 px-6 md:px-10 pb-10">
            <div className="mx-auto max-w-7xl">
                {showCta && (
                    <>
                        <div className="hairline mb-12" />
                        <Link
                            to={localizePath("/posts", locale)}
                            className="group inline-flex items-baseline gap-3 font-display font-medium tracking-[-0.02em] text-ink-900 dark:text-cream-50 leading-[1] mb-16"
                            style={{
                                fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                            }}
                        >
                            <span>{t("footer.cta.allPosts")}</span>
                            <span
                                aria-hidden
                                className="text-amber-500 transition-transform duration-500 group-hover:translate-x-2"
                            >
                                &rarr;
                            </span>
                        </Link>
                    </>
                )}

                {!showCta && <div className="hairline mb-10" />}

                <div className="flex flex-wrap items-center justify-between gap-y-6 gap-x-10 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-slate-soft">
                    <span>{t("footer.rights", { year })}</span>

                    <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <Link
                            to={localizePath("/posts", locale)}
                            className="hover:text-amber-500 transition-colors"
                        >
                            {t("nav.posts")}
                        </Link>
                        <Link
                            to={localizePath("/books", locale)}
                            className="hover:text-amber-500 transition-colors"
                        >
                            {t("nav.books")}
                        </Link>
                        <Link
                            to={localizePath("/tags", locale)}
                            className="hover:text-amber-500 transition-colors"
                        >
                            {t("nav.tags")}
                        </Link>
                        <Link
                            to={localizePath("/about", locale)}
                            className="hover:text-amber-500 transition-colors"
                        >
                            {t("nav.about")}
                        </Link>
                    </nav>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        {github && (
                            <a
                                href={`https://github.com/${github}`}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="hover:text-amber-500 transition-colors"
                            >
                                Github
                            </a>
                        )}
                        {twitter && (
                            <a
                                href={`https://twitter.com/${twitter}`}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="hover:text-amber-500 transition-colors"
                            >
                                Twitter
                            </a>
                        )}
                        <span
                            dangerouslySetInnerHTML={{
                                __html: t("footer.poweredBy", {
                                    gatsby: `<a class="hover:text-amber-500 transition-colors" href="https://www.gatsbyjs.com">Gatsby</a>`,
                                }),
                            }}
                        />
                    </div>
                </div>
            </div>
        </footer>
    );
};
