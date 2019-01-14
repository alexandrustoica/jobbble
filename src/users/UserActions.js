export const UserActions = {
    register : (user) => ({type: "REGISTER", payload: user}),
    login: (user) => ({type: "LOGIN", payload: user}),
    me: (token) => ({type: "GET_CURRENT_USER", token: token})
};
