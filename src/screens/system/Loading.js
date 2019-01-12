import {AsyncStorage, StatusBar} from "react-native";
import {Box} from "../../elements/box/Box";
import {Logo} from "../../elements/text/Logo";
import * as React from "react";
import {LinearGradient} from "expo";
import {CenterBox} from "../../elements/box/CenterBox";
import {Screen} from "../../elements/box/screen/Screen";

export class Loading extends React.Component {

    static navigationOptions = {header: null};

    componentWillMount = async () => {

    };

    render = () => <Box>
        <StatusBar
            backgroundColor="transparent"
            barStyle="light-content"/>
        <Screen>
            <LinearGradient
                colors={['#171818', '#0b0b0b']}
                style={{
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    position: 'absolute'
                }}/>
            <CenterBox><Logo/></CenterBox>
        </Screen>
    </Box>
}