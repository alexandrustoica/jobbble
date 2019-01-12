import {combineEpics, createEpicMiddleware} from "redux-observable";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {UserEpic} from "../users/UserEpics"
import {users} from "../users/UserReducers"

const epicMiddleware = createEpicMiddleware();
const root = combineReducers({users});
const epic = combineEpics(UserEpic);

export const store = createStore(root, applyMiddleware(epicMiddleware));
epicMiddleware.run(epic);
