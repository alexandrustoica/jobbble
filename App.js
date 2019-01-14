import React from 'react';

import {createAppContainer, createStackNavigator, createDrawerNavigator} from "react-navigation";
import {Welcome} from "./src/screens/system/Welcome";
import {Login} from "./src/screens/system/Login";
import {Register} from "./src/screens/system/Register";
import Jobs from "./src/screens/jobs/Jobs";
import AddJob from "./src/screens/jobs/AddJob";
import {Job} from "./src/screens/jobs/Job";
import {User} from "./src/screens/users/User";
import {Users} from "./src/screens/users/Users";

console.disableYellowBox = true;

const Menu = createDrawerNavigator({
    Jobs: Jobs,
    Users: Users
});

const Nav = createStackNavigator({
        Welcome: {screen: Welcome},
        Login: {screen: Login},
        Register: {screen: Register},
        Jobs: Menu,
        AddJob: {screen: AddJob},
        Job: {screen: Job},
        User: {screen: User}
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