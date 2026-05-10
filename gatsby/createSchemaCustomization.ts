export const createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
        type SiteSiteMetadata {
            author: Author
            siteUrl: String
            title: String
            social: Social
        }

        type Author {
            name: String
            bio: String
            email: String
        }

        type Social {
            twitter: String
            github: String
        }

        type Mdx implements Node {
            fields: MdxFields
        }

        type MdxFields {
            lang: String
            translationKey: String
            timeToRead: MdxTimeToRead
        }

        type MdxTimeToRead {
            text: String
            minutes: Float
            time: Float
            words: Int
        }

        type Frontmatter {
            title: String
            excerpt: String
            date: Date @dateformat
            slug: String
            tags: [String]
            keywords: [String]

            name: String
            projectUrl: String
            pinToHomePage: Boolean

            cover: String
            thumbnail: String
        }
    `);
};
