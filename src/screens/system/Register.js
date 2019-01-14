import React from "react";
import Intro from "./Intro";
import {Colors} from "../../elements/color/Colors";
import {Button} from "../../elements/components/Button";
import {EditText} from "../../elements/components/EditText";
import { KeyboardAvoidingView, ScrollView} from "react-native";
import {NavigationBar} from "../../elements/components/NavigationBar";
import {store} from "../../service/Store";
import {UserActions} from "../../users/UserActions";

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            name: '',
            age: 0,
            url: '',
            flexValue: 10
        }
    }

    __unsubscribeRegister = store.subscribe(() => {
        const {currentUser} = store.getState().users;
        if (currentUser !== undefined && currentUser !== null) {
            this.__unsubscribeRegister();
            store.dispatch(UserActions.login({
                username: currentUser.username,
                password: this.state.password
            }));
        }
    });

    __unsubscribe = store.subscribe(() => {
        const {token} = store.getState().users;
        if (token !== "" && token !== null) {
            this.__unsubscribe();
            this.props.navigation.navigate('Jobs');
        }
    });

    componentWillUnmount = () => this.__unsubscribeRegister();

    render = () => <KeyboardAvoidingView
        behaviour={'padding'}
        style={{flex: this.state.flexValue}}>
        <NavigationBar
            text={""}
            leftIcon={{name: 'arrow-back', color: 'white'}}
            leftAction={() => this.props.navigation.goBack()}/>
        <ScrollView>
            <EditText
                text={'Name'}
                iconName={'perm-identity'}
                iconColor={'black'}
                onChangeText={(name) => this.setState({name: name})}/>
            <EditText
                text={'Username'}
                iconName={'fingerprint'}
                iconColor={'black'}
                onChangeText={(username) =>
                    this.setState({username: username})}/>
            <EditText
                text={'Password'}
                password={true}
                iconName={'vpn-key'}
                iconColor={'black'}
                onChangeText={(password) =>
                    this.setState({password: password})}/>
            <EditText
                text={'Email'}
                iconName={'email'}
                iconColor={'black'}
                onChangeText={(email) => this.setState({email: email})}/>
           <EditText
                text={'Age'}
                iconName={'healing'}
                iconColor={'black'}
                onChangeText={(age) => this.setState({age: age})}/>
            <EditText
                text={'Profile Image URL'}
                iconName={'slideshow'}
                iconColor={'black'}
                onChangeText={(url) =>
                    this.setState({url: url})}/>
            <Button
                backgroundColor={Colors.BLUE}
                height={70}
                onPress={() => store.dispatch(UserActions.register({
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email,
                    age: this.state.age,
                    name: this.state.name,
                    profileImageUrl: this.state.url
                }))}
                text='Register'/>
        </ScrollView>
    </KeyboardAvoidingView>
}

export class Register extends React.Component {
    static navigationOptions = {header: null};
    render = () => <Intro content={<RegisterForm {...this.props}/>}/>
}
