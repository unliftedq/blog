import type { Locale } from "./config";

export type TranslationKey =
    | "nav.home"
    | "nav.posts"
    | "nav.books"
    | "nav.about"
    | "nav.tags"
    | "common.toggleTheme"
    | "common.menu"
    | "common.languageLabel"
    | "common.switchLanguage"
    | "home.greeting"
    | "home.subtitle"
    | "home.latestPosts"
    | "home.browseByTags.before"
    | "home.browseByTags.link"
    | "home.browseByTags.after"
    | "home.projects"
    | "home.empty"
    | "posts.title"
    | "posts.empty"
    | "books.title"
    | "books.empty"
    | "tags.title"
    | "tags.empty"
    | "about.title"
    | "about.body.p1"
    | "about.body.p2"
    | "about.body.p3"
    | "about.getInTouch"
    | "notFound.title"
    | "notFound.message"
    | "notFound.cta"
    | "footer.rights"
    | "footer.poweredBy"
    | "post.translationAvailable"
    | "post.viewTranslation";

export const translations: Record<Locale, Record<TranslationKey, string>> = {
    zh: {
        "nav.home": "首页",
        "nav.posts": "文章",
        "nav.books": "出版物",
        "nav.about": "关于",
        "nav.tags": "标签",
        "common.toggleTheme": "切换主题",
        "common.menu": "菜单",
        "common.languageLabel": "语言",
        "common.switchLanguage": "English",
        "home.greeting": "你好，我是王乔",
        "home.subtitle": "一名软件开发者",
        "home.latestPosts": "最新文章",
        "home.browseByTags.before": "你也可以按标签",
        "home.browseByTags.link": "浏览所有文章",
        "home.browseByTags.after": "。",
        "home.projects": "项目",
        "home.empty": "暂无内容",
        "posts.title": "全部文章",
        "posts.empty": "暂无文章",
        "books.title": "全部出版物",
        "books.empty": "暂无出版物",
        "tags.title": "标签",
        "tags.empty": "暂无标签",
        "about.title": "关于我",
        "about.body.p1": "我是王乔，一名生活在中国的软件开发者。",
        "about.body.p2":
            "我本科毕业于厦门大学，专业是微电子。目前就职于微软。我有十年左右的 Web 开发经验，对 NodeJS/JavaScript 和 .NET 都比较熟悉。",
        "about.body.p3": "我最喜欢的语言是 Haskell、C# 和 TypeScript。",
        "about.getInTouch": "联系我",
        "notFound.title": "404",
        "notFound.message": "你好，你访问的页面不存在。",
        "notFound.cta": "返回首页",
        "footer.rights": "© {year} • WANGQIAO.ME • 保留所有权利",
        "footer.poweredBy": "由 {gatsby} 强力驱动",
        "post.translationAvailable": "本文有英文版本：",
        "post.viewTranslation": "查看英文版",
    },
    en: {
        "nav.home": "Home",
        "nav.posts": "Posts",
        "nav.books": "Publications",
        "nav.about": "About",
        "nav.tags": "Tags",
        "common.toggleTheme": "Toggle theme",
        "common.menu": "Menu",
        "common.languageLabel": "Language",
        "common.switchLanguage": "中文",
        "home.greeting": "Hi, I'm Qiao Wang",
        "home.subtitle": "A software developer",
        "home.latestPosts": "Latest posts",
        "home.browseByTags.before": "You can also browse all my posts by tags ",
        "home.browseByTags.link": "here",
        "home.browseByTags.after": ".",
        "home.projects": "Projects",
        "home.empty": "Nothing here yet.",
        "posts.title": "All posts",
        "posts.empty": "No posts yet.",
        "books.title": "All publications",
        "books.empty": "No publications yet.",
        "tags.title": "Tags",
        "tags.empty": "No tags yet.",
        "about.title": "About me",
        "about.body.p1": "I'm Qiao Wang, a software developer living in China.",
        "about.body.p2":
            "I got my bachelor's degree at Xiamen University, majored in micro-electronics. Currently I'm working for Microsoft. I'm experienced in NodeJS/JavaScript and .NET development and I've been working in the field of web development for 10 years.",
        "about.body.p3": "My favorite languages are Haskell, C# and TypeScript.",
        "about.getInTouch": "Get in touch",
        "notFound.title": "404",
        "notFound.message": "Hi, the page you're looking for doesn't exist.",
        "notFound.cta": "Go to home page",
        "footer.rights": "© {year} • WANGQIAO.ME • ALL RIGHTS RESERVED",
        "footer.poweredBy": "Powered by {gatsby}",
        "post.translationAvailable": "This post is also available in Chinese: ",
        "post.viewTranslation": "View Chinese version",
    },
};
