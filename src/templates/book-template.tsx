import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { Locale } from "../i18n";

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
    if (mdx === null) {
        return null;
    }

    return (
        <Layout
            activeNavItem="books"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <div className="max-w-5xl mx-auto">
                <Meta
                    title={mdx.frontmatter!.name || ""}
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
                    image={mdx?.frontmatter?.thumbnail || ""}
                />
                <div className="prose xl:prose-xl dark:prose-invert dark:xl:prose-dark-xl max-w-none">
                    <h1 className="mb-0 xl:mb-2">{mdx.frontmatter!.name}</h1>
                    {children}
                </div>
            </div>
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
