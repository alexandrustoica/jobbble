export const UserActions = {
    register : (user) => ({type: "REGISTER", payload: user}),
    login: (user) => ({type: "LOGIN", payload: user}),
    me: (token) => ({type: "GET_CURRENT_USER", token: token}),
    get: (userId, token) => ({type: 'GET_USER', token: token, payload: userId}),
    all: (token) => ({type: "GET_USERS", token: token})
};
