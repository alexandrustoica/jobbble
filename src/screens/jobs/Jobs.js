import React from "react";
import {Icon} from "react-native-elements";
import {StatusBar, FlatList, Text} from "react-native";
import {store} from '../../service/Store';
import {JobActions} from "../../jobs/JobActions";
import {Screen} from "../../elements/box/screen/Screen";
import {NavigationBar} from "../../elements/components/NavigationBar";
import {Box} from "../../elements/box/Box";
import {ActionButton} from "../../elements/components/ActionButton";


export default class Jobs extends React.Component {

    static navigationOptions = {
        header: null,
        title: 'Jobs',
        drawerIcon: () => <Icon name={'filter-none'} color={'black'}/>
    };

    constructor(props) {
        super(props);
        const {token} = store.getState().users;
        this.state = {
            token: token,
            state: store.getState().jobs,
        }
    }

    componentWillMount = () => {
        store.dispatch(JobActions.all(this.state.token))
    };

    __unsubscribe = store.subscribe(() => {
        this.setState({state: store.getState().all})
    });

    componentWillUnmount = () => this.__unsubscribe();

    __showJobs = (items) =>
        <FlatList
            data={items}
            keyExtractor={(item, id) => id}
            renderItem={({item}) => <Text>{"test"}</Text>}/>;

    render = () =>
        <Screen backgroundColor={'white'}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            <NavigationBar
                text={"Jobs"}
                leftIcon={{name: "menu", color: "black"}}
                rightIcon={{name: "search", color: "black"}}
                leftAction={() => this.props.navigation.navigate('DrawerOpen')}/>
            {this.__showJobs(this.state.all)}
            <Box justifyContent={'flex-end'}
                 alignItems={'flex-end'}
                 pointerEvents={'box-none'}
                 style={{
                     position: 'absolute',
                     margin: -20,
                     width: '100%',
                     height: '100%'
                 }}>
                <ActionButton onPress={() =>
                    this.props.navigation.navigate('AddJob')}/>
            </Box>
        </Screen>
}
