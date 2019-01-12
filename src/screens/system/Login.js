import React from "react";
import Intro from "./Intro";
import {Colors} from "../../elements/color/Colors";
import {EditText} from "../../elements/components/EditText";
import {Button} from "../../elements/components/Button";
import {Keyboard, KeyboardAvoidingView} from "react-native";
import {NavigationBar} from "../../elements/components/NavigationBar";
import {UserActions} from "../../users/UserActions";
import {store} from "../../service/Store"
import {fromEvent} from "rxjs"

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            flexValue: 2
        };
    }

    async componentWillMount() {
        this.__keyboardShowSubscription =
            fromEvent(Keyboard, 'keyboardWillShow')
            .subscribe(() => this.setState({flexValue: 10}));

        this.__keyboardHideSubscription =
            fromEvent(Keyboard, 'keyboardWillHide')
            .subscribe(() => this.setState({flexValue: 2}));
    }
    __unsubscribe = store.subscribe(() => {
        const {token} = store.getState().users;
        if (token !== "" && token !== null) {
            this.__unsubscribe();
            this.props.navigation.navigate('Jobs');
        }
    });

    componentWillUnmount = () => this.__unsubscribe();

    render = () => <KeyboardAvoidingView
        behavior={'padding'}
        onKeyboardChange={() => this.setState({flexValue: 10})}
        style={{flex: this.state.flexValue}}>
        <NavigationBar
            text={""}
            leftIcon={{name: 'arrow-back', color: 'white'}}
            leftAction={() => this.props.navigation.goBack()}/>
        <EditText
            text={'Username'}
            iconName={'perm-identity'}
            iconColor={'black'}
            onChangeText={async (username) =>
                await this.setState({username: username})}/>
        <EditText
            text={'Password'}
            password={true}
            iconName={'vpn-key'}
            iconColor={'black'}
            onChangeText={async (password) =>
                await this.setState({password: password})}/>
        <Button
            backgroundColor={Colors.BLUE}
            onPress={() => store.dispatch(UserActions.login({
                username: this.state.username,
                password: this.state.password
            }))}
            text='Login'/>
    </KeyboardAvoidingView>
}

export class Login extends React.Component {
    static navigationOptions = {header: null};
    render = () =>
        <Intro content={<LoginForm {...this.props}/>}/>
}