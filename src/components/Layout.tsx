import * as React from "react";
import { HelmetProvider } from "react-helmet-async";

import { defaultLocale, Locale, LocaleProvider } from "../i18n";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { ThemeProvider } from "./ThemeProvider";

export interface LayoutProps {
    children: React.ReactNode;
    activeNavItem?: string;
    locale?: Locale;
    alternatePaths?: Partial<Record<Locale, string>>;
    /**
     * Show the large "Read all posts" CTA in the footer.
     * Defaults to false; only home, /posts, and post detail pages opt in.
     */
    showFooterCta?: boolean;
}

export const Layout = ({
    children,
    activeNavItem,
    locale = defaultLocale,
    alternatePaths,
    showFooterCta = false,
}: LayoutProps) => {
    return (
        <HelmetProvider>
            <LocaleProvider locale={locale}>
                <ThemeProvider>
                    <main className="bg-paper text-ink-900 dark:text-cream-50 overflow-x-hidden w-full max-w-full min-h-screen flex flex-col">
                        <Header
                            activeNavItem={activeNavItem}
                            alternatePaths={alternatePaths}
                        />
                        <div className="flex-1 pt-28 md:pt-32">{children}</div>
                        <Footer showCta={showFooterCta} />
                    </main>
                </ThemeProvider>
            </LocaleProvider>
        </HelmetProvider>
    );
};

export default Layout;
