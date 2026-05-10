import { Link, navigate } from "gatsby";
import React, { useContext, useState } from "react";

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

const NavItem = ({ link, name, active }: NavItemProps) => {
    return (
        <li
            role="menuitem"
            className={`main-nav-item px-5 hover:font-semibold ${
                active ? "font-bold hover:font-bold" : ""
            }`}
        >
            <Link to={link} data-text={name}>
                {name}
            </Link>
        </li>
    );
};

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
    const { locale, t } = useTranslation();

    const handleThemeChange = () => {
        setTheme!(theme === "light" ? "dark" : "light");
        setShowMenu(false);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

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

    return (
        <header className="text-base mb-14">
            <div className="max-w-5xl flex flex-row items-center text-center lg:text-left m-auto">
                <div className="leading-none flex flex-grow items-center">
                    <div className="block select-none py-1 font-bold text-xl text-gray-800 dark:text-gray-100">
                        <Link to={homeLink}>Qiao@www:~$</Link>
                    </div>
                </div>
                <div className="hidden md:flex flex-row items-center">
                    <nav className="select-none mt-4 lg:mt-0" role="menu">
                        <ul className="text-xl text-gray-700 dark:text-gray-200 flex">
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
                    {otherLocales.map((target) => (
                        <button
                            key={target}
                            type="button"
                            onClick={() => handleSwitchLanguage(target)}
                            className="mx-3 select-none mt-4 lg:mt-0 cursor-pointer text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                            title={t("common.switchLanguage")}
                            aria-label={t("common.switchLanguage")}
                        >
                            {localeNames[target]}
                        </button>
                    ))}
                    <div
                        className="mx-3 select-none mt-4 lg:mt-0 cursor-pointer"
                        onClick={handleThemeChange}
                        title={t("common.toggleTheme")}
                    >
                        <ThemeIcon />
                    </div>
                </div>
                <div className="md:hidden relative block text-left">
                    <div>
                        <button
                            type="button"
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:ring-gray-600"
                            onClick={toggleMenu}
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                        >
                            <MenuIcon />
                        </button>
                    </div>

                    {showMenu && (
                        <div
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:ring-gray-600"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex={-1}
                        >
                            <div className="py-1" role="none">
                                <div
                                    className="cursor text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
                                    role="menuitem"
                                    tabIndex={-1}
                                    onClick={() => navigateTo(homeLink)}
                                >
                                    {t("nav.home")}
                                </div>
                                <div
                                    className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
                                    role="menuitem"
                                    tabIndex={-1}
                                    onClick={() => navigateTo(postsLink)}
                                >
                                    {t("nav.posts")}
                                </div>
                                <div
                                    className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
                                    role="menuitem"
                                    tabIndex={-1}
                                    onClick={() => navigateTo(booksLink)}
                                >
                                    {t("nav.books")}
                                </div>
                                <div
                                    className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
                                    role="menuitem"
                                    tabIndex={-1}
                                    onClick={() => navigateTo(aboutLink)}
                                >
                                    {t("nav.about")}
                                </div>
                            </div>
                            <div className="py-1" role="none">
                                {otherLocales.map((target) => (
                                    <div
                                        key={target}
                                        className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
                                        role="menuitem"
                                        tabIndex={-1}
                                        onClick={() => handleSwitchLanguage(target)}
                                    >
                                        {localeNames[target]}
                                    </div>
                                ))}
                                <div
                                    className="flex flex-row text-gray-700 px-4 py-2 text-sm cursor-pointer hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
                                    role="menuitem"
                                    tabIndex={-1}
                                    onClick={handleThemeChange}
                                >
                                    <ThemeIcon />{" "}
                                    <span className="px-1">
                                        {t("common.toggleTheme")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
