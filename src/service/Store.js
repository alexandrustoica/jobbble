import {combineEpics, createEpicMiddleware} from "redux-observable";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {UserEpic} from "../users/UserEpics"
import {users} from "../users/UserReducers"
import {JobEpic} from "../jobs/JobEpics";
import {jobs} from "../jobs/JobReducers";
import logger from 'redux-logger'

const epicMiddleware = createEpicMiddleware();
const root = combineReducers({users, jobs});
const epic = combineEpics(UserEpic, JobEpic);

export const store = createStore(root,
    applyMiddleware(epicMiddleware, logger));

epicMiddleware.run(epic);
