module.exports = {
    title: "EchoFetch",
    description: "Decorator based HTTP client for browser & Node.JS based on Axios.",
    themeConfig: {
        nav: [
            {
                text: "Home",
                link: "/"
            },

            {
                text: "Installation",
                link: "/guide/installation"
            },

            {
                text: "Guide",
                link: "/guide"
            }
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
                    ]
                },
            ]
        }
    }
}