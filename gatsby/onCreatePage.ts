import { defaultLocale, locales } from "../src/i18n/config";

/**
 * Duplicate every file-system created page so that every non-default locale
 * gets its own URL prefixed with `/<locale>/...`. The default locale stays at
 * the root path. Pages programmatically created via `createPages` already set
 * `pageContext.locale` and are skipped here to avoid infinite re-creation.
 */
export const onCreatePage = ({ page, actions }: any) => {
    const { createPage, deletePage } = actions;

    if (page.context && page.context.locale) {
        return;
    }

    deletePage(page);

    const basePath: string = page.path;
    const baseMatchPath: string | undefined = page.matchPath;

    const alternatePaths: Record<string, string> = {};
    for (const locale of locales) {
        alternatePaths[locale] =
            locale === defaultLocale ? basePath : `/${locale}${basePath}`;
    }

    for (const locale of locales) {
        const localizedPath = alternatePaths[locale];
        const localizedMatchPath = baseMatchPath
            ? locale === defaultLocale
                ? baseMatchPath
                : `/${locale}${baseMatchPath}`
            : undefined;

        createPage({
            ...page,
            path: localizedPath,
            matchPath: localizedMatchPath,
            context: {
                ...page.context,
                locale,
                alternatePaths,
            },
        });
    }
};
