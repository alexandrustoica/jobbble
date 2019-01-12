import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import {store} from "./src/service/Store"
import {UserActions} from "./src/users/UserActions";


export default class App extends React.Component {
  render() {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => store.dispatch(UserActions.register({
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
