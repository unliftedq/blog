import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
    siteMetadata: {
        siteUrl: `https://wangqiao.me`,
        title: "Qiao Wang",
        author: {
            name: "Qiao Wang",
            bio: "谁非过客，花是主人",
            email: "wangqiao11@hotmail.com",
        },
        social: {
            twitter: `wangqiao11`,
            github: `unliftedq`,
        },
    },
    graphqlTypegen: true,
    plugins: [
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `posts`,
                path: `${__dirname}/posts`,
                ignore: [`**/\.png$`, `**/\.jpg$`, `**/\.jpeg$`, `**/\.gif$`],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `projects`,
                path: `${__dirname}/projects`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `books`,
                path: `${__dirname}/books`,
                ignore: [`**/\.png$`, `**/\.jpg$`, `**/\.jpeg$`, `**/\.gif$`],
            },
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: [`.md`, `.mdx`],
                mdxOptions: {
                    remarkPlugins: [],
                    rehypePlugins: [],
                },
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 800
                        }
                    },
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            classPrefix: "language-",

                            // inlineCodeMarker: null,

                            aliases: {},

                            showLineNumbers: false,

                            noInlineHighlight: false,
                            languageExtensions: [],
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-typegen`,
            options: {
                outputPath: "src/__generated__/gatsby-types.d.ts",
                emitSchema: {
                    "src/__generated__/gatsby-introspection.json": true,
                    "src/__generated__/gatsby-schema.graphql": true,
                },
                emitPluginDocument: {
                    "src/__generated__/gatsby-plugin-documents.graphql": true,
                },
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-postcss`,
        {
            resolve: `gatsby-plugin-clarity`,
            options: {
                clarity_project_id: "fys6rjltq3",
                enable_on_dev_env: false
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: [
                    "G-E335734SN7",
                ],
                gtagConfig: {
                    anonymize_ip: true
                },
                pluginConfig: {
                    head: false,
                    respectDNT: true,
                    exclude: [],
                },
            },
        },
    ],
};

export default config;
