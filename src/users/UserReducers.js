const initialState = {
    token: ""
};

export const users = (state = initialState, action) => {
    const UserHandlers = ({
        ['LOGIN_DONE']: (state, action) => ({
            ...state,
            lastUpdated: Date.now(),
            token: action.payload,
        }),
        ['REGISTER_DONE']: (state, action) => ({
            ...state,
            currentUser: action.payload
        }),
        ['GET_CURRENT_USER_DONE']: (state, action) => ({
            ...state,
            currentUser: action.payload
        })
    });

    return UserHandlers[action.type] ?
        UserHandlers[action.type](state, action) : state
};
