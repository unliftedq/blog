import { Link } from "gatsby";
import React from "react";

import Layout from "../components/Layout";
import { Meta } from "../components/Meta";
import { Locale, localizePath, useTranslation } from "../i18n";

interface NotFoundPageProps {
    pageContext: {
        locale?: Locale;
        alternatePaths?: Partial<Record<Locale, string>>;
    };
}

export default ({ pageContext }: NotFoundPageProps) => {
    const { locale, t } = useTranslation();

    return (
        <Layout
            locale={pageContext.locale}
            alternatePaths={pageContext.alternatePaths}
        >
            <Meta title={t("notFound.title")} />

            <section className="px-6 md:px-10 min-h-[70vh] flex items-center">
                <div className="mx-auto max-w-7xl w-full">
                    <p className="font-mono text-[0.72rem] tracking-[0.22em] uppercase text-slate-soft">
                        Error / 404
                    </p>
                    <h1
                        className="mt-6 font-display font-medium tracking-[-0.04em] leading-[0.85] text-ink-900 dark:text-cream-50"
                        style={{ fontSize: "clamp(6rem, 22vw, 18rem)" }}
                    >
                        404
                    </h1>
                    <p className="mt-10 max-w-xl text-lg md:text-xl leading-relaxed text-ink-600 dark:text-cream-200">
                        {t("notFound.message")}
                    </p>
                    <div className="mt-10">
                        <Link
                            to={localizePath("/", locale)}
                            className="btn-ink rounded-full px-6 py-3 text-sm font-medium tracking-tight inline-flex items-center gap-2"
                        >
                            {t("notFound.cta")}
                            <span aria-hidden>&rarr;</span>
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
};
