import React from "react";
import { graphql, Link } from "gatsby";

import { Layout } from "../components/Layout";
import { Meta } from "../components/Meta";
import { Reveal } from "../components/Reveal";
import MdxRenderer from "../components/MdxRenderer";
import { Locale, localizePath, useTranslation } from "../i18n";
import { formatDate } from "../utils/date";

interface HomePageProps {
    data: GatsbyTypes.HomePageQuery;
    pageContext: {
        locale?: Locale;
        alternatePaths?: Partial<Record<Locale, string>>;
    };
}

type Post = NonNullable<
    HomePageProps["data"]["posts"]["edges"][number]["node"]["childMdx"]
>;
type Project = NonNullable<
    HomePageProps["data"]["projects"]["nodes"][number]["childMdx"]
>;

export default ({ data, pageContext }: HomePageProps) => {
    const { locale, t } = useTranslation();

    // Force date DESC client-side as a safety net.
    const posts = (
        data.posts.edges
            .map((item) => item.node.childMdx)
            .filter(Boolean) as Post[]
    )
        .slice()
        .sort((a, b) =>
            (b.frontmatter?.date ?? "").localeCompare(
                a.frontmatter?.date ?? ""
            )
        );

    const projects = data.projects.nodes
        .map((item) => item.childMdx)
        .filter(Boolean) as Project[];

    const featured = posts.slice(0, 4);

    return (
        <Layout
            activeNavItem="home"
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
            showFooterCta
        >
            <Meta title={t("nav.home")} />

            {/* HERO */}
            <section className="relative px-6 md:px-10">
                <div className="mx-auto max-w-7xl pt-12 md:pt-20 pb-24 md:pb-32">
                    <Reveal className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-slate-soft">
                        <span className="inline-flex items-center gap-3">
                            <span className="block size-1.5 rounded-full bg-amber-500" />
                            {t("home.eyebrow")}
                        </span>
                    </Reveal>

                    <Reveal delay={1} className="mt-10">
                        <h1
                            className="font-display font-medium tracking-[-0.02em] leading-[0.95] text-ink-900 dark:text-cream-50 max-w-6xl"
                            style={{
                                fontSize: "clamp(2.75rem, 7.5vw, 6.25rem)",
                            }}
                        >
                            <span className="block">
                                {t("home.heroLine1")}
                            </span>
                            <span className="block">
                                {t("home.heroLine2")}
                            </span>
                            <span className="block">
                                {t("home.heroLine3")}
                            </span>
                        </h1>
                    </Reveal>

                    <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                        <Reveal delay={2} className="md:col-span-7">
                            <p className="text-lg md:text-xl leading-relaxed text-ink-600 dark:text-cream-200 max-w-2xl">
                                {t("home.heroLead")}
                            </p>
                        </Reveal>
                        <Reveal
                            delay={3}
                            className="md:col-span-5 flex flex-wrap items-center gap-3 md:justify-end"
                        >
                            <Link
                                to={localizePath("/posts", locale)}
                                className="btn-ink rounded-full px-6 py-3 text-sm font-medium tracking-tight inline-flex items-center gap-2"
                            >
                                {t("home.cta.readWriting")}
                                <span aria-hidden>&rarr;</span>
                            </Link>
                            <Link
                                to={localizePath("/about", locale)}
                                className="btn-ghost rounded-full px-6 py-3 text-sm font-medium tracking-tight inline-flex items-center gap-2"
                            >
                                {t("home.cta.about")}
                            </Link>
                        </Reveal>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl">
                    <div className="hairline" />
                </div>
            </section>

            {/* LATEST POSTS — editorial 2-up grid, every post has its own banner */}
            <section className="px-6 md:px-10 py-24 md:py-32">
                <div className="mx-auto max-w-7xl">
                    <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 mb-14">
                        <div className="md:col-span-9">
                            <h2
                                className="font-display font-medium tracking-[-0.02em] leading-[1] text-ink-900 dark:text-cream-50"
                                style={{
                                    fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)",
                                }}
                            >
                                {t("home.latestPosts")}
                            </h2>
                        </div>
                        <div className="md:col-span-3 md:flex md:items-end md:justify-end">
                            <Link
                                to={localizePath("/posts", locale)}
                                className="inline-flex items-center gap-2 font-mono text-[0.78rem] tracking-[0.18em] uppercase text-ink-900 dark:text-cream-50 hover:text-amber-500 transition-colors"
                            >
                                {t("home.viewAllPosts")}
                                <span aria-hidden>&rarr;</span>
                            </Link>
                        </div>
                    </Reveal>

                    {featured.length === 0 ? (
                        <p className="text-slate-soft">{t("home.empty")}</p>
                    ) : (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
                            {featured.map((post, i) => {
                                const slug = post.frontmatter?.slug || "";
                                const title = post.frontmatter?.title || "";
                                const excerpt =
                                    post.frontmatter?.excerpt || "";
                                const banner =
                                    post.frontmatter?.banner ||
                                    `/images/banners/${slug}.png`;
                                return (
                                    <Reveal
                                        key={post.id}
                                        tag="li"
                                        delay={
                                            (Math.min(i, 4) as 0
                                                | 1
                                                | 2
                                                | 3
                                                | 4)
                                        }
                                    >
                                        <Link
                                            to={localizePath(
                                                `/posts/${slug}`,
                                                locale
                                            )}
                                            className="group block"
                                        >
                                            <div className="overflow-hidden rounded-xl border border-ink-900/10 dark:border-cream-50/10 mb-6 aspect-[16/10] bg-cream-100 dark:bg-ink-800">
                                                <img
                                                    src={banner}
                                                    alt=""
                                                    aria-hidden="true"
                                                    className="size-full object-cover cinematic transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between gap-3 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-slate-soft mb-4">
                                                <span>
                                                    {formatDate(
                                                        post.frontmatter
                                                            ?.date,
                                                        locale
                                                    )}
                                                </span>
                                                <span className="opacity-60">
                                                    {String(i + 1).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>
                                            </div>
                                            <h3
                                                className="font-display font-medium tracking-[-0.02em] leading-[1.1] text-ink-900 dark:text-cream-50 group-hover:text-amber-500 transition-colors"
                                                style={{
                                                    fontSize:
                                                        "clamp(1.35rem, 2.2vw, 1.85rem)",
                                                }}
                                            >
                                                {title}
                                            </h3>
                                            {excerpt && (
                                                <p className="mt-3 text-ink-600 dark:text-cream-200 leading-relaxed line-clamp-3">
                                                    {excerpt}
                                                </p>
                                            )}
                                        </Link>
                                    </Reveal>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </section>

            {/* PROJECTS — compact horizontal cards */}
            {projects.length > 0 && (
                <>
                    <div className="px-6 md:px-10">
                        <div className="mx-auto max-w-7xl hairline" />
                    </div>
                    <section className="px-6 md:px-10 py-24 md:py-32">
                        <div className="mx-auto max-w-7xl">
                            <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 mb-14">
                                <div className="md:col-span-9">
                                    <p className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-slate-soft mb-3">
                                        {t("home.projects")}
                                    </p>
                                    <h2
                                        className="font-display font-medium tracking-[-0.02em] leading-[1] text-ink-900 dark:text-cream-50"
                                        style={{
                                            fontSize:
                                                "clamp(1.75rem, 3.4vw, 2.75rem)",
                                        }}
                                    >
                                        {t("home.projectsLead")}
                                    </h2>
                                </div>
                            </Reveal>

                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {projects.map((post, i) => {
                                    const name =
                                        post.frontmatter?.name || "Project";
                                    const url =
                                        post.frontmatter?.projectUrl || "#";
                                    const banner =
                                        post.frontmatter?.banner ||
                                        `/images/banners/project-${name
                                            .toLowerCase()
                                            .replace(/[^a-z0-9]+/g, "-")
                                            .replace(/^-|-$/g, "")}.png`;
                                    return (
                                        <Reveal
                                            key={post.id}
                                            tag="li"
                                            delay={
                                                (Math.min(i, 4) as 0
                                                    | 1
                                                    | 2
                                                    | 3
                                                    | 4)
                                            }
                                        >
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                className="group flex items-start gap-4 rounded-xl border border-ink-900/10 dark:border-cream-50/10 p-4 hover:border-ink-900/30 dark:hover:border-cream-50/30 transition-colors h-full"
                                            >
                                                <div className="shrink-0 size-16 rounded-lg overflow-hidden bg-cream-100 dark:bg-ink-800 border border-ink-900/5 dark:border-cream-50/5">
                                                    <img
                                                        src={banner}
                                                        alt=""
                                                        aria-hidden="true"
                                                        className="size-full object-cover cinematic transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-display font-medium text-base md:text-lg tracking-tight text-ink-900 dark:text-cream-50 group-hover:text-amber-500 transition-colors">
                                                        {name}
                                                    </h3>
                                                    <div className="mt-2 text-sm text-ink-600 dark:text-cream-200 leading-relaxed line-clamp-2">
                                                        <MdxRenderer
                                                            content={
                                                                post.body || ""
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <span
                                                    aria-hidden
                                                    className="shrink-0 self-center text-amber-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                                                >
                                                    &rarr;
                                                </span>
                                            </a>
                                        </Reveal>
                                    );
                                })}
                            </ul>
                        </div>
                    </section>
                </>
            )}
        </Layout>
    );
};

export const query = graphql`
    query HomePage($locale: String) {
        posts: allFile(
            filter: {
                sourceInstanceName: { eq: "posts" }
                childMdx: { fields: { lang: { eq: $locale } } }
            }
        ) {
            edges {
                node {
                    childMdx {
                        id
                        frontmatter {
                            slug
                            title
                            date
                            excerpt
                            banner
                        }
                    }
                }
            }
        }

        projects: allFile(
            filter: {
                sourceInstanceName: { eq: "projects" }
                childMdx: {
                    fields: { lang: { eq: $locale } }
                    frontmatter: { pinToHomePage: { eq: true } }
                }
            }
            sort: { childMdx: { frontmatter: { name: DESC } } }
        ) {
            nodes {
                childMdx {
                    id
                    body
                    frontmatter {
                        name
                        projectUrl
                        banner
                    }
                }
            }
        }
    }
`;
