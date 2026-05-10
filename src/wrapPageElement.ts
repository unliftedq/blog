import * as React from "react";
import type {
    GatsbyBrowser,
    GatsbySSR,
    WrapPageElementBrowserArgs,
    WrapPageElementNodeArgs,
} from "gatsby";

import { defaultLocale, Locale, LocaleProvider } from "./i18n";

type WrapArgs =
    | WrapPageElementBrowserArgs<unknown, { locale?: Locale }>
    | WrapPageElementNodeArgs<unknown, { locale?: Locale }>;

export const wrapPageElement: NonNullable<
    GatsbyBrowser["wrapPageElement"] & GatsbySSR["wrapPageElement"]
> = ({ element, props }: WrapArgs) => {
    const locale = (props.pageContext?.locale ?? defaultLocale) as Locale;
    return React.createElement(
        LocaleProvider,
        { locale },
        element as React.ReactNode
    );
};
