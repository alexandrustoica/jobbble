const initialState = {
    token: ""
};
export const users = (state = initialState, action) => {
    console.log(state);
    const handlers = ({
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
    return handlers[action.type] ?
        handlers[action.type](state, action) : state
};
