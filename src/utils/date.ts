import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";

import { dayjsLocale, Locale } from "../i18n/config";

dayjs.extend(localizedFormat);

export const formatDate = (
    date: string | Date | undefined | null,
    locale: Locale,
    format: string = "LL"
): string => {
    if (!date) return "";
    return dayjs(date).locale(dayjsLocale[locale]).format(format);
};
