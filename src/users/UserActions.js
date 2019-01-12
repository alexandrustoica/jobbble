export const UserActions = {
    register : (user) => ({type: "REGISTER", payload: user}),
    login: (user) => ({type: "LOGIN", payload: user})
};
