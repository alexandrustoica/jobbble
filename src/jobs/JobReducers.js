const initialState = {
    all: []
};

const JobHandlers= ({
    ['GET_JOBS_DONE']: (state, action) => ({
        ...state,
        all: action.payload,
    }),
    ['CREATE_JOB_DONE']: (state, action) => ({
        ...state,
        all: [...state.all, action.payload]
    }),
});

export const jobs = (state = initialState, action) => {
    return JobHandlers[action.type] ?
        JobHandlers[action.type](state, action) : state
};
