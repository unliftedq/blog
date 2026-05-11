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
    | "home.latestPostsLead"
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
        "nav.posts": "文章",
        "nav.books": "出版物",
        "nav.about": "关于",
        "nav.tags": "标签",
        "common.toggleTheme": "切换主题",
        "common.menu": "菜单",
        "common.languageLabel": "语言",
        "common.switchLanguage": "EN",
        "common.readMore": "阅读",
        "brand.mark": "笔记",
        "home.eyebrow": "代码 · 阅读 · 梦享",
        "home.greeting": "你好",
        "home.subtitle": "一份小小的笔记",
        "home.heroLine1": "关于代码、",
        "home.heroLine2": "书和生活",
        "home.heroLine3": "的笔记。",
        "home.heroLead":
            "这里收录了一些写下来比较安心的笔记。话题大多围绕编程、阅读和生活中所思。",
        "home.cta.readWriting": "开始阅读",
        "home.cta.about": "关于",
        "home.latestPosts": "最新文章",
        "home.latestPostsLead": "按时间倒序",
        "home.viewAllPosts": "查看全部",
        "home.browseByTags.before": "你也可以按标签",
        "home.browseByTags.link": "浏览所有文章",
        "home.browseByTags.after": "。",
        "home.projects": "项目",
        "home.projectsLead": "我做过的一些小东西",
        "home.empty": "暂无内容",
        "posts.title": "文章",
        "posts.empty": "暂无文章",
        "posts.countLabel": "篇笔记",
        "books.title": "出版物",
        "books.empty": "暂无出版物",
        "books.countLabel": "篇长文",
        "tags.title": "标签",
        "tags.empty": "暂无标签",
        "tags.countLabel": "个主题",
        "about.title": "关于",
        "about.eyebrow": "这里是谁的笔记",
        "about.body.p1":
            "这是一份小小的笔记本。这里的作者是一名生活在中国的软件开发者。",
        "about.body.p2":
            "本科毕业于厦门大学，专业是微电子。目前就职于微软。十年左右的 Web 开发经验，对 NodeJS/JavaScript 和 .NET 都比较熟悉。",
        "about.body.p3": "最喜欢的语言是 Haskell、C# 和 TypeScript。",
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
        "nav.posts": "Writing",
        "nav.books": "Long-form",
        "nav.about": "About",
        "nav.tags": "Topics",
        "common.toggleTheme": "Toggle theme",
        "common.menu": "Menu",
        "common.languageLabel": "Language",
        "common.switchLanguage": "中",
        "common.readMore": "Read",
        "brand.mark": "Notes",
        "home.eyebrow": "Code · Reading · Daydreams",
        "home.greeting": "Hello",
        "home.subtitle": "A small notebook",
        "home.heroLine1": "A small",
        "home.heroLine2": "notebook on code,",
        "home.heroLine3": "books, and life.",
        "home.heroLead":
            "A few things worth writing down — mostly about programming, reading, and whatever else turns up along the way.",
        "home.cta.readWriting": "Start reading",
        "home.cta.about": "About",
        "home.latestPosts": "Latest posts",
        "home.latestPostsLead": "Most recent first",
        "home.viewAllPosts": "All posts",
        "home.browseByTags.before": "You can also browse all posts by topic ",
        "home.browseByTags.link": "here",
        "home.browseByTags.after": ".",
        "home.projects": "Projects",
        "home.projectsLead": "A few things I've made",
        "home.empty": "Nothing here yet.",
        "posts.title": "Writing",
        "posts.empty": "No posts yet.",
        "posts.countLabel": "notes so far",
        "books.title": "Long-form",
        "books.empty": "No publications yet.",
        "books.countLabel": "longer pieces",
        "tags.title": "Topics",
        "tags.empty": "No tags yet.",
        "tags.countLabel": "threads",
        "about.title": "About",
        "about.eyebrow": "Whose notebook is this",
        "about.body.p1":
            "A small notebook, kept by a software developer based in China.",
        "about.body.p2":
            "Bachelor's degree at Xiamen University, majored in micro-electronics. Currently working for Microsoft. About ten years of web development; comfortable with NodeJS/JavaScript and .NET.",
        "about.body.p3":
            "Favourite languages: Haskell, C#, and TypeScript.",
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
        "post.backToIndex": "Back to writing",
    },
};
