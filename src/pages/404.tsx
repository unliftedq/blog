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
            <div>
                <Meta title={t("notFound.title")} />
                <h1 className="mx-auto font-bold text-5xl text-center mt-32 md:mt-36 lg:mt-48">
                    {t("notFound.title")}
                </h1>
                <div className="mx-auto font-bold text-gray-600 dark:text-gray-200 text-xl text-center mt-8">
                    {t("notFound.message")}
                </div>
                <div className="flex justify-center mt-8">
                    <button className="mx-auto px-4 pt-1 pb-2 text-base text-blue-600 dark:text-blue-400 font-semibold rounded-full border border-blue-200 hover:text-white dark:hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                        <Link to={localizePath("/", locale)}>
                            {t("notFound.cta")}
                        </Link>
                    </button>
                </div>
            </div>
        </Layout>
    );
};
