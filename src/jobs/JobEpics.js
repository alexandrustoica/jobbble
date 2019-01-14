import {combineEpics, ofType} from "redux-observable";
import {map, mergeMap} from "rxjs/operators";
import {from} from "rxjs";
import {Headers} from "../service/Headers";
import {Endpoints} from "../service/Endpoints";

const GetAllJobsEpic = action$ => action$.pipe(
    ofType("GET_JOBS"),
    mergeMap(action =>
        from(fetch(Endpoints.jobs, {
            method: "GET",
            headers: Headers.withToken(action.payload)
        }).then(response => response.json()))
            .pipe(map(response =>
            ({type: "GET_JOBS_DONE", payload: response})))));

const CreateJobEpic = action$ => action$.pipe(
    ofType("CREATE_JOB"),
    mergeMap(action =>
        from(fetch(Endpoints.jobs, {
            method: "POST",
            headers: Headers.withToken(action.token),
            body: JSON.stringify(action.payload)
        }).then(response => response.json()))
            .pipe(map(response =>
                ({type: "CREATE_JOB_DONE", payload: response})))));

const ApplyJobEpic = action$ => action$.pipe(
    ofType("APPLY_JOB"),
    mergeMap(action =>
        from(fetch(Endpoints.jobs + `apply/${action.payload}`, {
            method: "PUT",
            headers: Headers.withToken(action.token)
        }).then(response => response.json()))
            .pipe(map(response =>
                ({type: "APPLY_JOB_DONE", payload: response})))));

const UnapplyJobEpic = action$ => action$.pipe(
    ofType("UNAPPLY_JOB"),
    mergeMap(action =>
        from(fetch(Endpoints.jobs + `unapply/${action.payload}`, {
            method: "PUT",
            headers: Headers.withToken(action.token)
        }).then(response => response.json()))
            .pipe(map(response =>
                ({type: "UNAPPLY_JOB_DONE", payload: response})))));

const GetJobEpic = action$ => action$.pipe(
    ofType("GET_JOB"),
    mergeMap(action =>
        from(fetch(Endpoints.jobs + `${action.payload}`, {
            method: "GET",
            headers: Headers.withToken(action.token)
        }).then(response => response.json()))
            .pipe(map(response =>
                ({type: "GET_JOB_DONE", payload: response})))));


const DeleteJobEpic = action$ => action$.pipe(
    ofType("DELETE_JOB"),
    mergeMap(action =>
        from(fetch(Endpoints.jobs + `${action.payload}`, {
            method: "DELETE",
            headers: Headers.withToken(action.token)
        }).then(response => response.json()))
            .pipe(map(response =>
                ({type: "DELETE_JOB_DONE", payload: response})))));

export const JobEpic = combineEpics(
    GetAllJobsEpic, CreateJobEpic,
    ApplyJobEpic, UnapplyJobEpic, GetJobEpic, DeleteJobEpic);
