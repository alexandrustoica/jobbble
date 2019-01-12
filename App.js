import React from 'react';
import {StyleSheet} from 'react-native';

import {createAppContainer, createStackNavigator} from "react-navigation";
import {Welcome} from "./src/system/Welcome";
import {Login} from "./src/system/Login";
import {Register} from "./src/system/Register";


const Nav = createStackNavigator({
        Welcome: {screen: Welcome},
        Login: {screen: Login},
        Register: {screen: Register}
    }, {
        index: 0,
        headerMode: 'screen',
        navigationOptions: {
            gesturesEnabled: false
        }
    });

export default createAppContainer(Nav);