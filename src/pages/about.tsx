import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { Reveal } from "../components/Reveal";
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
    const email = data.site?.siteMetadata?.author?.email ?? "";

    return (
        <Layout
            activeNavItem="about"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <Meta title={t("about.title")} />

            <section className="px-6 md:px-10">
                <div className="mx-auto max-w-7xl pt-8 md:pt-16 pb-16 md:pb-24">
                    <Reveal className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-slate-soft">
                        {t("about.eyebrow")}
                    </Reveal>
                    <Reveal delay={1} className="mt-6">
                        <h1
                            className="font-display font-medium tracking-[-0.02em] leading-[0.95] text-ink-900 dark:text-cream-50 max-w-5xl"
                            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
                        >
                            {t("about.title")}
                        </h1>
                    </Reveal>
                </div>
                <div className="mx-auto max-w-7xl hairline" />
            </section>

            <section className="px-6 md:px-10 py-20 md:py-28">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12">
                    <Reveal className="md:col-span-8">
                        <div className="prose-editorial max-w-none">
                            <p>{t("about.body.p1")}</p>
                            <p>{t("about.body.p2")}</p>
                            <p>{t("about.body.p3")}</p>
                        </div>
                    </Reveal>

                    <Reveal delay={1} className="md:col-span-4">
                        <p className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-slate-soft mb-4">
                            {t("about.getInTouch")}
                        </p>
                        <ul className="space-y-3">
                            {email && (
                                <li>
                                    <a
                                        className="hover:text-amber-500 transition-colors text-ink-900 dark:text-cream-50"
                                        href={`mailto:${email}`}
                                    >
                                        {email}
                                    </a>
                                </li>
                            )}
                            <li>
                                <a
                                    className="hover:text-amber-500 transition-colors text-ink-900 dark:text-cream-50"
                                    href={`https://${githubUrl}`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {githubUrl}
                                </a>
                            </li>
                            <li>
                                <a
                                    className="hover:text-amber-500 transition-colors text-ink-900 dark:text-cream-50"
                                    href={`https://${twitterUrl}`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    {twitterUrl}
                                </a>
                            </li>
                        </ul>
                    </Reveal>
                </div>
            </section>
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
