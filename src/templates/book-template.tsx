import * as React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { Reveal } from "../components/Reveal";
import { Locale, localizePath, useTranslation } from "../i18n";

interface BookTemplateProps {
    data: GatsbyTypes.BookQuery;
    pageContext: {
        locale: Locale;
        alternatePaths?: Partial<Record<Locale, string>>;
    };
    children: React.ReactNode;
}

const BookTemplate = ({
    data: { mdx },
    pageContext,
    children,
}: BookTemplateProps) => {
    const { locale, t } = useTranslation();
    if (mdx === null) {
        return null;
    }

    const name = mdx.frontmatter?.name ?? "";

    return (
        <Layout
            activeNavItem="books"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <Meta
                title={name}
                description={mdx.frontmatter?.excerpt || ""}
                type="article"
                extras={[
                    {
                        name: "keywords",
                        content: (mdx.frontmatter?.keywords || []).join(","),
                    },
                ]}
                image={mdx.frontmatter?.thumbnail || ""}
            />

            <article className="px-6 md:px-10">
                <header className="mx-auto max-w-7xl pt-4 md:pt-12 pb-12">
                    <Reveal className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-slate-soft mb-6">
                        <Link
                            to={localizePath("/books", locale)}
                            className="inline-flex items-center gap-2 hover:text-amber-500 transition-colors"
                        >
                            <span aria-hidden>&larr;</span>
                            {t("nav.books")}
                        </Link>
                    </Reveal>
                    <Reveal delay={1}>
                        <h1
                            className="font-display font-medium tracking-[-0.02em] leading-[0.95] text-ink-900 dark:text-cream-50 max-w-5xl"
                            style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)" }}
                        >
                            {name}
                        </h1>
                    </Reveal>
                    {mdx.frontmatter?.excerpt && (
                        <Reveal delay={2} className="mt-8 max-w-2xl">
                            <p className="text-lg md:text-xl leading-relaxed text-ink-600 dark:text-cream-200">
                                {mdx.frontmatter.excerpt}
                            </p>
                        </Reveal>
                    )}
                    <div className="mt-12 hairline" />
                </header>

                <div className="mx-auto max-w-3xl pb-24 md:pb-32">
                    <div className="prose-editorial max-w-none">
                        {children}
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export const pageQuery = graphql`
    query Book($id: String!) {
        mdx(id: { eq: $id }) {
            id
            frontmatter {
                name
                slug
                thumbnail
                excerpt
                keywords
            }
            fields {
                lang
            }
        }
    }
`;

export default BookTemplate;
