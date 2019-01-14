import React from "react";
import {Image, StatusBar, Text, View} from "react-native";
import {store} from "../../service/Store"
import {UserActions} from "../../users/UserActions";
import {Screen} from "../../elements/box/screen/Screen";
import {NavigationBar} from "../../elements/components/NavigationBar";
import {EditText} from "../../elements/components/EditText";
import {Box} from "../../elements/box/Box";
import {Colors} from "../../elements/color/Colors";

export class User extends React.Component {

    static navigationOptions = {
        header: null,
        title: 'My Profile',
    };

    constructor(props) {
        super(props);
        const {token} = store.getState().users;
        this.state = {
            token: token,
            id: this.props.navigation.state.params.userId,
            user: {
                name: "",
                profileImageUrl: "",
                username: "",
                email: "",
                age: 30,
            }
        }
    }

    componentWillMount = () =>
        store.dispatch(UserActions.get(this.state.id, this.state.token));

    __unsubscribe = store.subscribe(() => {
        const {wantedUser} = store.getState().users;
        if (wantedUser !== null && wantedUser !== undefined) {
            this.setState({user: wantedUser})
        }
    });

    componentWillUnmount = () => this.__unsubscribe();

    render = () =>
        <Screen backgroundColor={'white'}>
            <NavigationBar
                text={"User Profile"} align={'left'}
                leftIcon={{name: 'arrow-back', color: 'black'}}
                leftAction={() => this.props.navigation.goBack()}/>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            <Box flex={3} alignItems={'center'} flexDirection={'column'}
                 style={{margin: 20}}>
                <Image borderRadius={40}
                       style={{width: 80, height: 80}}
                       source={{uri: this.state.user.profileImageUrl}}/>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                    padding: 30
                }}>
                    {this.state.user.name}
                </Text>
                <View style={{
                    borderRadius: 5, padding: 10,
                    backgroundColor: Colors.SUMMER_BLUE
                }}>
                    <Text style={{fontSize: 16}}>
                        {this.state.user.id}
                    </Text>
                </View>
            </Box>
            <EditText
                text={`Username: \t ${this.state.user.username}`}
                editable={false}
                height={40}
                iconName={'fingerprint'}
                iconColor={'black'}/>
            <EditText
                text={`Age: \t ${this.state.user.age}`}
                editable={false}
                height={40}
                iconName={'healing'}
                iconColor={'black'}/>
            <EditText
                text={`Email: \t ${this.state.user.email}`}
                editable={false}
                height={40}
                iconName={'email'}
                iconColor={'black'}/>
        </Screen>


}
