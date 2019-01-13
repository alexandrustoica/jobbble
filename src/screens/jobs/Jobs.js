import React from "react";
import {Icon} from "react-native-elements";
import {StatusBar, FlatList, Text} from "react-native";
import {store} from '../../service/Store';
import {JobActions} from "../../jobs/JobActions";
import {Screen} from "../../elements/box/screen/Screen";
import {NavigationBar} from "../../elements/components/NavigationBar";
import {Box} from "../../elements/box/Box";
import {ActionButton} from "../../elements/components/ActionButton";
import {ItemJob} from "./JobItem";


export default class Jobs extends React.Component {

    static navigationOptions = {
        header: {
            visible: false,
        },
        title: 'Jobs',
        drawerIcon: () => <Icon name={'filter-none'} color={'black'}/>
    };

    constructor(props) {
        super(props);
        const {token} = store.getState().users;
        this.state = {
            token: token,
            jobs: store.getState().jobs,
        }
    }

    componentWillMount = () => {
        store.dispatch(JobActions.all(this.state.token))
    };

    __unsubscribe = store.subscribe(() =>
        this.setState({jobs: store.getState().jobs})
    );

    componentWillUnmount = () => this.__unsubscribe();

    render = () =>
        <Screen backgroundColor={'white'}>
            <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"/>
            <NavigationBar
                text={"Jobs"}
                leftIcon={{name: "menu", color: "black"}}
                rightIcon={{name: "search", color: "black"}}
                leftAction={() => this.props.navigation.openDrawer()}/>
            <FlatList
                data={this.state.jobs.all}
                keyExtractor={(item, id) => id}
                renderItem={({item}) =>
                    <ItemJob {...this.props} item={item}/>} />
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
