import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import {mergeMap, map} from "rxjs/operators";
import {createEpicMiddleware, ofType} from "redux-observable";
import {ajax} from "rxjs/ajax";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {from} from "rxjs"

const User = (id, username, password, role) => ({
    id: id,
    username: username,
    password: password,
    role: role
});

const register = (user) => ({type: "REGISTER", payload: user});


const registerEpic = action$ => action$.pipe(
    ofType("REGISTER"),
    mergeMap(action =>
        from(fetch("http://192.168.0.25:8081/students/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload)
        })).pipe(map(response => (
                {type: "REGISTER_DONE", payload: response}))
        )
    )
);

const systemReducer = (state = {token: ""}, action) => {
    console.log(state);
    const handlers = ({
        ['LOGIN_DONE']: (state, action) => ({
            ...state,
            lastUpdated: Date.now(),
            token: action.payload,
        }),
        ['REGISTER_DONE']: (state, action) => ({
            ...state,
            currentUser: action.payload
        })
    });
    //console.log(action.payload);
    return handlers[action.type] ?
        handlers[action.type](state, action) : state
};


const epicMiddleware = createEpicMiddleware();
const root = combineReducers({systemReducer});

const store = createStore(root, applyMiddleware(epicMiddleware));
epicMiddleware.run(registerEpic);

export default class App extends React.Component {
  render() {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => store.dispatch(register({
            password: "test",
            username: "test",
            role: "STUDENT"
        }))} >
            <Text>Test</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
