
export const Headers = {
    defaultHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withToken: (token) => ({
        ...defaultHeaders,
        'Authorization': token
    })
};
