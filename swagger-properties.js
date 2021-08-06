module.exports = {
    routePrefix: '/docsme',
    openapi: {
        openapi: "3.0.0",
        info: {
            title: "human bot",
            description: "human is boss",
            version: "0.1.1"
        },
        servers: [
            {
                url: "http://127.0.0.1:3000/",
            }
        ],

        tags: [{
            name: "user",
            description: "abc",
            externalDocs: {
                "description": "Find more info here",
                "url": "https://example.com"
            }
        }],
        externalDocs: {
            url: "abc.com",
            description: "find docs here"
        },

        components: {

            securitySchemes: {
                apiKey: {
                    type: "apiKey",
                    name: "apiKey",
                    in: "header"
                }
            }
        },
        security: [
         { $ref :"#/components/securitySchemes/apiKey",}
        ]

    },
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true
}