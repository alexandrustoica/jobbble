const initialState = {
    token: "",
    all: []
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
        }),
        ['GET_USER_DONE']: (state, action) => ({
        ...state,
        wantedUser: action.payload
        }),
        ['GET_USERS_DONE']: (state, action) => ({
            ...state,
            all: action.payload
        })
    });

    return UserHandlers[action.type] ?
        UserHandlers[action.type](state, action) : state
};
