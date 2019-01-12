import React from "react";
import Intro from "./Intro";
import {Colors} from "../elements/color/Colors";
import {EditText} from "../elements/components/EditText";
import {Button} from "../elements/components/Button";
import {KeyboardAvoidingView} from "react-native";
import {NavigationBar} from "../elements/components/NavigationBar";


class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            flexValue: 2,
            error: {
                visible: false,
                message: "nothing",
            }
        }
    }

    async componentWillMount() {}
    componentWillUnmount() {}

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
            onPress={() => {}}
            text='Login'/>
    </KeyboardAvoidingView>
}

export class Login extends React.Component {
    static navigationOptions = {header: null};
    render = () =>
        <Intro content={<LoginForm {...this.props}/>}/>
}