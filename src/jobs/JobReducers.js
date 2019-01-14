const initialState = {
    currentJob: null,
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
    ['APPLY_JOB_DONE']: (state, action) => ({
        ...state,
        currentJob: action.payload
    }),
    ['UNAPPLY_JOB_DONE']: (state, action) => ({
        ...state,
        currentJob: action.payload
    }),
    ['GET_JOB_DONE']: (state, action) => ({
        ...state,
        currentJob: action.payload,
        all: [...state.all.filter(
            it => it.id !== action.payload.id), action.payload]
    }),
    ['DELETE_JOB_DONE']: (state, action) => ({
        ...state,
        all: state.all.filter(it => it.id !== action.payload.id)
    }),
});

export const jobs = (state = initialState, action) => {
    return JobHandlers[action.type] ?
        JobHandlers[action.type](state, action) : state
};
