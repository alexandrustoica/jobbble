import React from "react";
import {Icon} from "react-native-elements";
import {StatusBar, FlatList} from "react-native";
import {store} from '../../service/Store';
import {Screen} from "../../elements/box/screen/Screen";
import {NavigationBar} from "../../elements/components/NavigationBar";
import {UserActions} from "../../users/UserActions";
import {ItemUser} from "./UserItem";


export class Users extends React.Component {

    static navigationOptions = {
        title: 'Users',
        drawerIcon: () => <Icon name={'accessibility'} color={'black'}/>
    };

    constructor(props) {
        super(props);
        const {token} = store.getState().users;
        this.state = {
            token: token,
            users: store.getState().users,
        }
    }

    componentWillMount = () =>
        store.dispatch(UserActions.all(this.state.token));

    __unsubscribe = store.subscribe(() =>
        this.setState({users: store.getState().users}));

    componentWillUnmount = () => this.__unsubscribe();

    render = () =>
        <Screen backgroundColor={'white'}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            <NavigationBar
                text={"Users"}
                leftIcon={{name: "menu", color: "black"}}
                rightIcon={{name: "search", color: "black"}}
                leftAction={() => this.props.navigation.openDrawer()}/>
            <FlatList
                data={this.state.users.all}
                keyExtractor={(item, id) => id}
                renderItem={({item}) =>
                    <ItemUser {...this.props} item={item}/>} />
        </Screen>
}
