import {combineEpics, ofType} from "redux-observable";
import {map, mergeMap} from "rxjs/operators";
import {from} from "rxjs";
import {Headers} from "../service/Headers";
import {Endpoints} from "../service/Endpoints";


const RegisterUserEpic = action$ => action$.pipe(
    ofType("REGISTER"),
    mergeMap(action =>
        from(fetch(Endpoints.students, {
            method: "POST",
            headers: Headers.defaultHeaders,
            body: JSON.stringify(action.payload)
        }).then(response => response.json()))
            .pipe(map(response =>
            ({type: "REGISTER_DONE", payload: response})))));

const LoginUserEpic = action$ => action$.pipe(
    ofType("LOGIN"),
    mergeMap(action =>
        from(fetch(Endpoints.login, {
            method: "POST",
            headers: Headers.defaultHeaders,
            body: JSON.stringify(action.payload)
        })).pipe(map(response =>
            ({type: "LOGIN_DONE", payload:
                    response.headers.get("Authorization")})))));

export const UserEpic = combineEpics(RegisterUserEpic, LoginUserEpic);
