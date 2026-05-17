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
    | "common.readMore"
    | "brand.mark"
    | "home.eyebrow"
    | "home.greeting"
    | "home.subtitle"
    | "home.heroLine1"
    | "home.heroLine2"
    | "home.heroLine3"
    | "home.heroLead"
    | "home.cta.readWriting"
    | "home.cta.about"
    | "home.latestPosts"
    | "home.viewAllPosts"
    | "home.browseByTags.before"
    | "home.browseByTags.link"
    | "home.browseByTags.after"
    | "home.projects"
    | "home.projectsLead"
    | "home.empty"
    | "posts.title"
    | "posts.empty"
    | "posts.countLabel"
    | "books.title"
    | "books.empty"
    | "books.countLabel"
    | "tags.title"
    | "tags.empty"
    | "tags.countLabel"
    | "about.title"
    | "about.eyebrow"
    | "about.body.p1"
    | "about.body.p2"
    | "about.body.p3"
    | "about.getInTouch"
    | "notFound.title"
    | "notFound.message"
    | "notFound.cta"
    | "footer.rights"
    | "footer.poweredBy"
    | "footer.cta.allPosts"
    | "footer.elsewhere"
    | "footer.browse"
    | "post.translationAvailable"
    | "post.viewTranslation"
    | "post.backToIndex";

export const translations: Record<Locale, Record<TranslationKey, string>> = {
    zh: {
        "nav.home": "首页",
        "nav.posts": "博客",
        "nav.books": "出版物",
        "nav.about": "关于",
        "nav.tags": "标签",
        "common.toggleTheme": "切换主题",
        "common.menu": "菜单",
        "common.languageLabel": "语言",
        "common.switchLanguage": "EN",
        "common.readMore": "阅读",
        "brand.mark": "Qiao Wang",
        "home.eyebrow": "代码 · 阅读 · 生活",
        "home.greeting": "你好",
        "home.subtitle": "一个个人博客",
        "home.heroLine1": "记录",
        "home.heroLine2": "代码与",
        "home.heroLine3": "日常生活。",
        "home.heroLead":
            "想到值得写的，再慢慢写下来。",
        "home.cta.readWriting": "开始阅读",
        "home.cta.about": "关于",
        "home.latestPosts": "最新内容",
        "home.viewAllPosts": "查看全部",
        "home.browseByTags.before": "你也可以按标签",
        "home.browseByTags.link": "浏览所有文章",
        "home.browseByTags.after": "。",
        "home.projects": "项目",
        "home.projectsLead": "我做过的一些小东西",
        "home.empty": "暂无内容",
        "posts.title": "博客",
        "posts.empty": "暂无文章",
        "posts.countLabel": "篇文章",
        "books.title": "出版物",
        "books.empty": "暂无出版物",
        "books.countLabel": "本出版物",
        "tags.title": "标签",
        "tags.empty": "暂无标签",
        "tags.countLabel": "个主题",
        "about.title": "关于",
        "about.eyebrow": "关于我",
        "about.body.p1":
            "你好，我是一名软件开发者，这里是我写东西的地方。",
        "about.body.p2":
            "写代码大概十年，做过的东西挺杂——Web、桌面、移动端，以及一些不太好归类的小角落。常用的工具是 TypeScript 和 .NET，偶尔也会跑去玩一些更怪的语言。这里写的，多是一些想留下来的东西——一些设计上的决定、一些尚未成型的念头，以及那些花了好几年才真正看明白的模式。",
        "about.body.p3":
            "代码之外，喜欢慢慢读书，尤其是讲事物原理那一类。最喜欢的编程语言是 Haskell、C# 和 TypeScript。",
        "about.getInTouch": "联系方式",
        "notFound.title": "404",
        "notFound.message": "你好，你访问的页面不存在。",
        "notFound.cta": "返回首页",
        "footer.rights": "© {year}",
        "footer.poweredBy": "由 {gatsby} 强力驱动",
        "footer.cta.allPosts": "查看全部文章",
        "footer.elsewhere": "在别处",
        "footer.browse": "浏览",
        "post.translationAvailable": "本文有英文版本：",
        "post.viewTranslation": "查看英文版",
        "post.backToIndex": "返回所有文章",
    },
    en: {
        "nav.home": "Home",
        "nav.posts": "Blog",
        "nav.books": "Publications",
        "nav.about": "About",
        "nav.tags": "Topics",
        "common.toggleTheme": "Toggle theme",
        "common.menu": "Menu",
        "common.languageLabel": "Language",
        "common.switchLanguage": "中",
        "common.readMore": "Read",
        "brand.mark": "Qiao Wang",
        "home.eyebrow": "Code · Reading · Life",
        "home.greeting": "Hello",
        "home.subtitle": "A personal blog",
        "home.heroLine1": "Writing",
        "home.heroLine2": "about code",
        "home.heroLine3": "and everyday life.",
        "home.heroLead":
            "Written slowly, and only when there's something worth saying.",
        "home.cta.readWriting": "Start reading",
        "home.cta.about": "About",
        "home.latestPosts": "Recent writing",
        "home.viewAllPosts": "All posts",
        "home.browseByTags.before": "You can also browse all posts by topic ",
        "home.browseByTags.link": "here",
        "home.browseByTags.after": ".",
        "home.projects": "Projects",
        "home.projectsLead": "A few things I've made",
        "home.empty": "Nothing here yet.",
        "posts.title": "Blog",
        "posts.empty": "No posts yet.",
        "posts.countLabel": "posts so far",
        "books.title": "Publications",
        "books.empty": "No publications yet.",
        "books.countLabel": "publications",
        "tags.title": "Topics",
        "tags.empty": "No tags yet.",
        "tags.countLabel": "threads",
        "about.title": "About",
        "about.eyebrow": "About me",
        "about.body.p1":
            "Hi — I'm a software developer, and this is where I write.",
        "about.body.p2":
            "I've been writing software for about a decade — across the web, desktop, mobile, and the odd corner that doesn't fit any of those labels. The tools I reach for most are TypeScript and .NET, with occasional detours into something stranger. What I write about here tends to be the things I want to remember: design decisions, half-formed ideas, and patterns that took me years to actually see.",
        "about.body.p3":
            "Outside of code, I read — usually slowly, usually about how things work. Favourite languages: Haskell, C#, and TypeScript.",
        "about.getInTouch": "Get in touch",
        "notFound.title": "404",
        "notFound.message": "Hi, the page you're looking for doesn't exist.",
        "notFound.cta": "Go to home page",
        "footer.rights": "© {year}",
        "footer.poweredBy": "Powered by {gatsby}",
        "footer.cta.allPosts": "Read all posts",
        "footer.elsewhere": "Elsewhere",
        "footer.browse": "Browse",
        "post.translationAvailable": "This post is also available in Chinese: ",
        "post.viewTranslation": "View Chinese version",
        "post.backToIndex": "Back to blog",
    },
};
