import React from "react";
import {StatusBar, Text} from "react-native";
import {store} from '../../service/Store';
import {Screen} from "../../elements/box/screen/Screen";
import {NavigationBar} from "../../elements/components/NavigationBar";
import {Box} from "../../elements/box/Box";
import moment from "moment/moment";

export class Job extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        const {token} = store.getState().users;
        this.state = {
            token: token,
            item: this.props.navigation.state.params.item
        }
    }

    render = () =>
        <Screen backgroundColor={'white'}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            <NavigationBar
                text={"Job"}
                align={'left'}
                leftIcon={{name: 'arrow-back', color: 'black'}}
                leftAction={() => this.props.navigation.goBack()}/>
            <Box flexDirection={'column'} style={{margin: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {this.state.item.title}
                </Text>
                <Text style={{marginTop: 10, fontSize: 18}}>
                    {this.state.item.text}
                </Text>
                <Text style={{marginTop: 10, marginRight: 20, fontSize: 18}}>
                        {moment(this.state.item.createdBy).fromNow()}</Text>
            </Box>
        </Screen>
}