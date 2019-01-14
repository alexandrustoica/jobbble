import {Screen} from "../../elements/box/screen/Screen";
import React from "react";
import {StatusBar, ScrollView} from "react-native";
import {NavigationBar} from "../../elements/components/NavigationBar";
import {EditText} from "../../elements/components/EditText";
import {Button} from "../../elements/components/Button";
import {Colors} from "../../elements/color/Colors";
import * as R from "ramda";
import {store} from "../../service/Store"
import {JobActions} from "../../jobs/JobActions";

export default class AddJob extends React.Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);

        const {token} = store.getState().users;
        this.state = {
            token: token,
            newJob: {
                title: '',
                text: '',
                company: '',
                location: '',
                position: ''
            }
        }
    }

    __saveNewJob = () => {
        store.dispatch(JobActions.create(this.state.newJob, this.state.token))
    };

    __goToJobsScreen = () =>
        this.props.navigation.navigate('Jobs');

    __saveJobAndGoToJobsScreen = () =>
        R.compose(this.__goToJobsScreen,
            this.__saveNewJob)();

    render = () =>
        <Screen backgroundColor={'white'}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            <ScrollView style={{flex: 1}} bounces={false}>
                <NavigationBar
                    text={"Add Job"}
                    align={'left'}
                    leftIcon={{name: 'arrow-back', color: 'black'}}
                    leftAction={() => this.props.navigation.goBack()}/>
                <EditText
                    flex={1}
                    fontSize={20}
                    text={"Write a title for your job."}
                    onChangeText={(title) => this.setState({newJob:
                            {...this.state.newJob, title: title}})}/>
                <EditText
                    flex={1}
                    fontSize={14}
                    text={"Write a short description for your job."}
                    onChangeText={(text) => this.setState({newJob:
                            {...this.state.newJob, text: text}})}/>
                <EditText
                    flex={1}
                    fontSize={14}
                    text={"Location"}
                    onChangeText={(location) => this.setState({newJob:
                            {...this.state.newJob, location: location}})}/>
                <EditText
                    flex={1}
                    fontSize={14}
                    text={"Company"}
                    onChangeText={(company) => this.setState({newJob:
                            {...this.state.newJob, company: company}})}/>
                <EditText
                    flex={1}
                    fontSize={14}
                    text={"Position"}
                    onChangeText={(position) => this.setState({newJob:
                            {...this.state.newJob, position: position}})}/>
                <Button
                        backgroundColor={Colors.BLUE}
                        text={"SAVE JOB"}
                        height={70}
                        width={'100%'}
                        flex={null}
                        onPress={() => this.__saveJobAndGoToJobsScreen()}/>
            </ScrollView>
        </Screen>
}