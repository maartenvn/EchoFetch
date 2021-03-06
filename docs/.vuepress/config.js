module.exports = {
    title: "EchoFetch",
    description: "Decorator based HTTP client for browser & Node.JS based on Axios.",
    base: "/EchoFetch/",
    themeConfig: {
        nav: [
            {
                text: "Home",
                link: "/"
            },

            {
                text: "Installation",
                link: "/guide/installation.md"
            },

            {
                text: "Guide",
                link: "/guide/getting-started.md"
            },

            {
                text: "Github",
                link: "https://github.com/maartenvn/EchoFetch/"
            },
        ],
        sidebar: {
            "/": [
                "",
                "guide/installation.md",
                {
                    title: "Essentials",
                    collapsable: false,
                    children: [
                        'guide/getting-started.md',
                        'guide/decorators.md',
                        'guide/echopromise.md',
                        'guide/interceptors.md',
                        'guide/converters.md',
                    ]
                },
                {
                    title: "Framework integration",
                    collapsable: false,
                    children: [
                        'guide/vue.md',
                    ]
                },
            ]
        }
    }
}