import path from "path";
import readingTime from "reading-time";

import { defaultLocale, Locale, locales } from "../src/i18n/config";

const isLocale = (value: string): value is Locale =>
    (locales as readonly string[]).includes(value);

export const onCreateNode = ({ node, actions, getNode }: any) => {
    const { createNodeField } = actions;

    if (node.internal.type !== `Mdx`) return;

    createNodeField({
        node,
        name: `timeToRead`,
        value: readingTime(node.body),
    });

    const fileNode = getNode(node.parent);
    if (!fileNode) return;

    // File name (without extension) is the locale, e.g. `en.mdx` / `zh.mdx`.
    // Anything else falls back to the default locale.
    const fileName: string = fileNode.name ?? "";
    const lang: Locale = isLocale(fileName) ? fileName : defaultLocale;

    // The parent directory is the canonical translation key — every locale
    // variant of the same post lives in the same directory.
    const relativeDir: string = fileNode.relativeDirectory ?? "";
    const translationKey =
        path.basename(relativeDir) || (fileNode.name as string);

    createNodeField({ node, name: `lang`, value: lang });
    createNodeField({ node, name: `translationKey`, value: translationKey });
};
