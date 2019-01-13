import React from 'react';

import {createAppContainer, createStackNavigator, createDrawerNavigator} from "react-navigation";
import {Welcome} from "./src/screens/system/Welcome";
import {Login} from "./src/screens/system/Login";
import {Register} from "./src/screens/system/Register";
import Jobs from "./src/screens/jobs/Jobs";
import AddJob from "./src/screens/jobs/AddJob";
import {Job} from "./src/screens/jobs/Job";

console.disableYellowBox = true;

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
                header: false,
                headerVisible: false
            }
        },
        AddJob: {screen: AddJob},
        Job: {screen: Job}
    }, {
        index: 0,
        headerMode: 'modal',
        navigationOptions: {
            header: {
              visible: false
            },
            gesturesEnabled: false
        }
    });

export default createAppContainer(Nav);