export const JobActions = {
    all: (token) => ({type: "GET_JOBS", payload: token}),
    create: (job, token) => ({type: "CREATE_JOB", payload: job, token: token}),
    get: (jobId, token) => ({type: "GET_JOB", payload: jobId, token: token}),
    apply: (jobId, token) => ({type: "APPLY_JOB", payload: jobId, token: token}),
    unapply: (jobId, token) => ({type: "UNAPPLY_JOB", payload: jobId, token: token})
};
