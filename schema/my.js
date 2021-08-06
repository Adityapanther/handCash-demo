


module.exports = {
    headers: {
        type: 'object',
        properties: {
            listMe: {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        }
    },
    body: {
        type: "object",
        properties: {
            name: {
                type: "string"
            }
        },
        required: ["name"]
    }
}