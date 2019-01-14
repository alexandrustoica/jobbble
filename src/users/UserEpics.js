import {combineEpics, ofType} from "redux-observable";
import {map, mergeMap} from "rxjs/operators";
import {from} from "rxjs";
import {Headers} from "../service/Headers";
import {Endpoints} from "../service/Endpoints";


const RegisterUserEpic = action$ => action$.pipe(
    ofType("REGISTER"),
    mergeMap(action =>
        from(fetch(Endpoints.hrs, {
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

const GetCurrentUserEpic = action$ => action$.pipe(
    ofType("GET_CURRENT_USER"),
    mergeMap(action =>
        from(fetch(Endpoints.users + "me", {
            method: "GET",
            headers: Headers.withToken(action.token)
        }).then(response => response.json()))
            .pipe(map(response =>
                ({type: "GET_CURRENT_USER_DONE", payload: response})))));

const GetUserEpic = action$ => action$.pipe(
    ofType("GET_USER"),
    mergeMap(action =>
        from(fetch(Endpoints.users + `${action.payload}`, {
            method: "GET",
            headers: Headers.withToken(action.token)
        }).then(response => response.json()))
            .pipe(map(response =>
                ({type: "GET_USER_DONE", payload: response})))));

const GetUsersEpic = action$ => action$.pipe(
    ofType("GET_USERS"),
    mergeMap(action =>
        from(fetch(Endpoints.users, {
            method: "GET",
            headers: Headers.withToken(action.token)
        }).then(response => response.json()))
            .pipe(map(response =>
                ({type: "GET_USERS_DONE", payload: response})))));

export const UserEpic = combineEpics(
    RegisterUserEpic, LoginUserEpic,
    GetCurrentUserEpic, GetUserEpic, GetUsersEpic);
