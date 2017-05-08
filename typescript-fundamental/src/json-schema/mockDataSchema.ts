export const schema = {
    properties: {
        users: {
            type: 'array',
            maxItems: 5,
            minItems: 3,
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        minimum: 1,
                        unique: true,
                    },
                    firstName: {
                        type: 'string',
                        faker: 'name.firstName',
                    },
                    lastName: {
                        type: 'string',
                        faker: 'name.lastName',
                    },
                    email: {
                        type: 'string',
                        faker: 'internet.email',
                    },
                },
                required: ['id', 'firstName', 'lastName', 'email'],
            },
        },
    },
    type: 'object',
    required: ['users'],
};
