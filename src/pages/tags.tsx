import React from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { Reveal } from "../components/Reveal";
import { Locale, localizePath, useTranslation } from "../i18n";

interface TagsPageProps {
    data: GatsbyTypes.TagsPageQuery;
    pageContext: {
        locale?: Locale;
        alternatePaths?: Partial<Record<Locale, string>>;
    };
}

const SIZES = [
    { min: 1, font: "clamp(1.5rem, 2.4vw, 2rem)" },
    { min: 2, font: "clamp(1.75rem, 3vw, 2.6rem)" },
    { min: 4, font: "clamp(2.25rem, 4vw, 3.5rem)" },
    { min: 7, font: "clamp(3rem, 5.5vw, 4.75rem)" },
];

const sizeFor = (count: number) =>
    [...SIZES].reverse().find((s) => count >= s.min)?.font ?? SIZES[0].font;

export default ({ data, pageContext }: TagsPageProps) => {
    const { locale, t } = useTranslation();
    const tags = [...data.tags.group].sort(
        (a: any, b: any) => b.totalCount - a.totalCount
    );

    return (
        <Layout
            activeNavItem="tags"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <Meta title={t("tags.title")} />

            <section className="px-6 md:px-10">
                <div className="mx-auto max-w-7xl pt-8 md:pt-16 pb-16 md:pb-24">
                    <Reveal className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-slate-soft">
                        {tags.length} {t("tags.countLabel")}
                    </Reveal>
                    <Reveal delay={1} className="mt-6">
                        <h1
                            className="font-display font-medium tracking-[-0.02em] leading-[0.95] text-ink-900 dark:text-cream-50 max-w-5xl"
                            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                        >
                            {t("tags.title")}
                        </h1>
                    </Reveal>
                </div>
                <div className="mx-auto max-w-7xl hairline" />
            </section>

            <section className="px-6 md:px-10 py-16 md:py-24">
                <div className="mx-auto max-w-7xl">
                    {tags.length === 0 ? (
                        <p className="text-slate-soft">{t("tags.empty")}</p>
                    ) : (
                        <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                            {tags.map((tag: any, i: number) => (
                                <Reveal
                                    key={tag.fieldValue}
                                    tag="li"
                                    delay={(Math.min(i % 5, 4) as 0
                                        | 1
                                        | 2
                                        | 3
                                        | 4)}
                                >
                                    <Link
                                        to={localizePath(
                                            `/tags/${_.kebabCase(
                                                tag.fieldValue
                                            )}`,
                                            locale
                                        )}
                                        className="group inline-flex items-baseline gap-2 font-display font-medium tracking-[-0.02em] text-ink-900 dark:text-cream-50 hover:text-amber-500 transition-colors"
                                        style={{
                                            fontSize: sizeFor(tag.totalCount),
                                            lineHeight: 1.05,
                                        }}
                                    >
                                        <span>{tag.fieldValue}</span>
                                        <span className="font-mono text-[0.55em] tracking-[0.18em] text-slate-soft group-hover:text-amber-500 transition-colors">
                                            {tag.totalCount}
                                        </span>
                                    </Link>
                                </Reveal>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
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
