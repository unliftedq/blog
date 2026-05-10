import { Link, navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";

import {
    Locale,
    localeNames,
    locales,
    localizePath,
    stripLocaleFromPath,
    useTranslation,
} from "../i18n";

import { MenuIcon } from "./Icons/MenuIcon";
import { ThemeIcon } from "./Icons/ThemeIcon";
import { ThemeContext } from "./ThemeProvider";

interface NavItemProps {
    link: string;
    name: string;
    active: boolean;
}

const NavItem = ({ link, name, active }: NavItemProps) => (
    <li
        role="menuitem"
        className={`main-nav-item ${active ? "is-active" : ""}`}
    >
        <Link
            to={link}
            className="px-4 py-2 inline-block text-[0.95rem] tracking-tight font-medium text-ink-900 dark:text-cream-50"
        >
            {name}
        </Link>
    </li>
);

export interface HeaderProps {
    activeNavItem?: string;
    alternatePaths?: Partial<Record<Locale, string>>;
}

const computeAlternatePath = (
    target: Locale,
    current: Locale,
    alternatePaths: Partial<Record<Locale, string>> | undefined
): string => {
    if (alternatePaths && alternatePaths[target]) {
        return alternatePaths[target] as string;
    }
    if (typeof window === "undefined") {
        return localizePath("/", target);
    }
    const stripped = stripLocaleFromPath(window.location.pathname);
    return localizePath(stripped || "/", target);
};

export const Header = ({ activeNavItem = "", alternatePaths }: HeaderProps) => {
    const { theme, setTheme } = useContext(ThemeContext);
    const [showMenu, setShowMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { locale, t } = useTranslation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleThemeChange = () => {
        setTheme!(theme === "light" ? "dark" : "light");
        setShowMenu(false);
    };

    const toggleMenu = () => setShowMenu(!showMenu);

    const navigateTo = (link: string) => {
        navigate(link);
        setShowMenu(false);
    };

    const homeLink = localizePath("/", locale);
    const postsLink = localizePath("/posts", locale);
    const booksLink = localizePath("/books", locale);
    const aboutLink = localizePath("/about", locale);

    const otherLocales = locales.filter((l) => l !== locale);

    const handleSwitchLanguage = (target: Locale) => {
        const path = computeAlternatePath(target, locale, alternatePaths);
        navigate(path);
        setShowMenu(false);
    };

    const pillBase =
        "rounded-full border border-ink-900/10 dark:border-cream-50/15 bg-cream-50/70 dark:bg-ink-900/60 backdrop-blur-xl";

    return (
        <header
            className={`fixed top-4 inset-x-0 z-50 px-4 transition-all duration-500 ${
                scrolled ? "" : "translate-y-0"
            }`}
        >
            <div className="mx-auto max-w-7xl">
                {/* Desktop: split-pill nav */}
                <div className="hidden md:flex items-center justify-between gap-3">
                    <Link
                        to={homeLink}
                        className={`${pillBase} group inline-flex items-center gap-3 px-5 py-2.5 transition-all duration-300 hover:border-ink-900/25 dark:hover:border-cream-50/30`}
                    >
                        <span className="block size-2.5 rounded-full bg-amber-500 transition-transform duration-500 group-hover:scale-125" />
                        <span className="font-mono text-[0.78rem] tracking-[0.18em] uppercase text-ink-900 dark:text-cream-50">
                            {t("brand.mark")}
                        </span>
                    </Link>

                    <nav role="menu" className={`${pillBase} px-2 py-1.5`}>
                        <ul className="flex items-center">
                            <NavItem
                                name={t("nav.home")}
                                link={homeLink}
                                active={activeNavItem === "home"}
                            />
                            <NavItem
                                name={t("nav.posts")}
                                link={postsLink}
                                active={activeNavItem === "posts"}
                            />
                            <NavItem
                                name={t("nav.books")}
                                link={booksLink}
                                active={activeNavItem === "books"}
                            />
                            <NavItem
                                name={t("nav.about")}
                                link={aboutLink}
                                active={activeNavItem === "about"}
                            />
                        </ul>
                    </nav>

                    <div
                        className={`${pillBase} flex items-center gap-1 px-2 py-1.5`}
                    >
                        {otherLocales.map((target) => (
                            <button
                                key={target}
                                type="button"
                                onClick={() => handleSwitchLanguage(target)}
                                className="px-3 py-1 rounded-full font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-900 dark:text-cream-50 hover:bg-ink-900/5 dark:hover:bg-cream-50/10 transition-colors cursor-pointer"
                                title={t("common.switchLanguage")}
                                aria-label={t("common.switchLanguage")}
                            >
                                {localeNames[target]}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={handleThemeChange}
                            className="size-8 inline-flex items-center justify-center rounded-full hover:bg-ink-900/5 dark:hover:bg-cream-50/10 transition-colors text-ink-900 dark:text-cream-50 cursor-pointer"
                            title={t("common.toggleTheme")}
                            aria-label={t("common.toggleTheme")}
                        >
                            <ThemeIcon />
                        </button>
                    </div>
                </div>

                {/* Mobile pill */}
                <div
                    className={`${pillBase} md:hidden flex items-center justify-between px-4 py-2.5 relative`}
                >
                    <Link
                        to={homeLink}
                        className="inline-flex items-center gap-2"
                    >
                        <span className="block size-2 rounded-full bg-amber-500" />
                        <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ink-900 dark:text-cream-50">
                            {t("brand.mark")}
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="size-9 inline-flex items-center justify-center rounded-full text-ink-900 dark:text-cream-50 cursor-pointer"
                        aria-expanded={showMenu}
                        aria-haspopup="true"
                        aria-label={t("common.menu")}
                    >
                        <MenuIcon />
                    </button>

                    {showMenu && (
                        <div
                            className="absolute right-0 top-full mt-3 w-64 origin-top-right rounded-3xl border border-ink-900/10 dark:border-cream-50/15 bg-cream-50 dark:bg-ink-900 shadow-2xl shadow-ink-900/10 overflow-hidden"
                            role="menu"
                            aria-orientation="vertical"
                        >
                            <div className="py-2">
                                {[
                                    { label: t("nav.home"), link: homeLink },
                                    { label: t("nav.posts"), link: postsLink },
                                    { label: t("nav.books"), link: booksLink },
                                    { label: t("nav.about"), link: aboutLink },
                                ].map((item) => (
                                    <button
                                        key={item.link}
                                        type="button"
                                        onClick={() => navigateTo(item.link)}
                                        className="w-full text-left px-5 py-3 text-base text-ink-900 dark:text-cream-50 hover:bg-ink-900/5 dark:hover:bg-cream-50/10 transition-colors cursor-pointer"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                            <div className="border-t border-ink-900/10 dark:border-cream-50/10 py-2">
                                {otherLocales.map((target) => (
                                    <button
                                        key={target}
                                        type="button"
                                        onClick={() =>
                                            handleSwitchLanguage(target)
                                        }
                                        className="w-full text-left px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-900 dark:text-cream-50 hover:bg-ink-900/5 dark:hover:bg-cream-50/10 transition-colors cursor-pointer"
                                    >
                                        {localeNames[target]}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleThemeChange}
                                    className="w-full flex items-center gap-3 px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-900 dark:text-cream-50 hover:bg-ink-900/5 dark:hover:bg-cream-50/10 transition-colors cursor-pointer"
                                >
                                    <ThemeIcon />
                                    {t("common.toggleTheme")}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
