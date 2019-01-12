const initialState = {
    token: ""
};

const UserHandlers = ({
    ['LOGIN_DONE']: (state, action) => ({
        ...state,
        lastUpdated: Date.now(),
        token: action.payload,
    }),
    ['REGISTER_DONE']: (state, action) => ({
        ...state,
        currentUser: action.payload
    })
});

export const users = (state = initialState, action) => {
    console.log(state);
    return UserHandlers[action.type] ?
        UserHandlers[action.type](state, action) : state
};
