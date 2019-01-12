import React from 'react';

import {createAppContainer, createStackNavigator, createDrawerNavigator} from "react-navigation";
import {Welcome} from "./src/screens/system/Welcome";
import {Login} from "./src/screens/system/Login";
import {Register} from "./src/screens/system/Register";
import Jobs from "./src/screens/jobs/Jobs";

const Menu = createDrawerNavigator({
    Jobs: {screen: Jobs}
});

const Nav = createStackNavigator({
        Welcome: {screen: Welcome},
        Login: {screen: Login},
        Register: {screen: Register},
        Jobs: {
            screen: Menu,
            navigationOptions: {
                header: false
            }
        },
    }, {
        index: 0,
        headerMode: 'screen',
        navigationOptions: {
            gesturesEnabled: false
        }
    });

export default createAppContainer(Nav);