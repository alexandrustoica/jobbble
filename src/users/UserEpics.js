import {combineEpics, ofType} from "redux-observable";
import {map, mergeMap} from "rxjs/operators";
import {from} from "rxjs";
import {Headers} from "../service/Headers";



const RegisterUserEpic = action$ => action$.pipe(
    ofType("REGISTER"),
    mergeMap(action =>
        from(fetch("http://192.168.0.25:8081/students/", {
            method: "POST",
            headers: Headers.defaultHeaders,
            body: JSON.stringify(action.payload)
        })).pipe(map(response =>
            ({type: "REGISTER_DONE", payload: response})))));

export const UserEpic = combineEpics(RegisterUserEpic);
