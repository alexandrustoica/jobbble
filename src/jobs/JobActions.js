export const JobActions = {
    all: (token) => ({type: "GET_JOBS", payload: token}),
    create: (job, token) => ({type: "CREATE_JOB", payload: job, token: token})
};
