import {combineEpics, ofType} from "redux-observable";
import {map, mergeMap} from "rxjs/operators";
import {from} from "rxjs";
import {Headers} from "../service/Headers";
import {Endpoints} from "../service/Endpoints";

const GetAllJobs = action$ => action$.pipe(
    ofType("GET_JOBS"),
    mergeMap(action =>
        from(fetch(Endpoints.jobs, {
            method: "GET",
            headers: Headers.withToken(action.payload)
        }).then(response => response.json()))
            .pipe(map(response =>
            ({type: "GET_JOBS_DONE", payload: response})))));

export const JobEpic = combineEpics(GetAllJobs);
