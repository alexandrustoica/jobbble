import React from "react";
import Intro from "./Intro";
import {Colors} from "../../elements/color/Colors";
import {Button} from "../../elements/components/Button";
import {EditText} from "../../elements/components/EditText";
import { KeyboardAvoidingView, ScrollView, StyleSheet} from "react-native";
import {NavigationBar} from "../../elements/components/NavigationBar";

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: {
                visible: false,
                message: "nothing",
            },
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            name: '',
            role: 'USER',
            flexValue: 6
        }
    }

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
                onChangeText={async (name) =>
                    await this.setState({name: name})}/>
            <EditText
                text={'Username'}
                iconName={'fingerprint'}
                iconColor={'black'}
                onChangeText={async (username) =>
                    await this.setState({username: username})}/>
            <EditText
                text={'Email'}
                iconName={'email'}
                iconColor={'black'}
                onChangeText={async (email) =>
                    await this.setState({email: email})}/>
            <EditText
                text={'Password'}
                password={true}
                iconName={'vpn-key'}
                iconColor={'black'}
                onChangeText={async (password) =>
                    await this.setState({password: password})}/>
            <EditText
                text={'Confirm Password'}
                password={true}
                iconName={'vpn-key'}
                iconColor={'black'}
                onChangeText={async (confirmPassword) =>
                    await this.setState({confirmPassword: confirmPassword})}/>
            <Button
                backgroundColor={Colors.BLUE}
                height={70}
                onPress={() => {}}
                text='Register'/>
        </ScrollView>
    </KeyboardAvoidingView>
}

export class Register extends React.Component {
    static navigationOptions = {header: null};
    render = () => <Intro content={<RegisterForm {...this.props}/>}/>
}
