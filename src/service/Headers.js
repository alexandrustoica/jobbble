
export const Headers = {
    defaultHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    withToken: (token) => ({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
    })
};
