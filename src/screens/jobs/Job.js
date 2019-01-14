import React from "react";
import {StatusBar, Text, ScrollView, FlatList} from "react-native";
import {store} from '../../service/Store';
import {Screen} from "../../elements/box/screen/Screen";
import {NavigationBar} from "../../elements/components/NavigationBar";
import {Box} from "../../elements/box/Box";
import moment from "moment/moment";
import {Button} from "../../elements/components/Button";
import {Colors} from "../../elements/color/Colors";
import {JobActions} from "../../jobs/JobActions";
import {ItemUser} from "../users/UserItem";

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
    componentWillMount = () =>
        store.dispatch(JobActions.get(this.state.item.id, this.state.token));

    __unsubscribe = store.subscribe(() => {
        const {currentJob} = store.getState().jobs;
        if (currentJob !== null) {
            this.setState({item: currentJob})
        }
    });

    componentWillUnmount = () => this.__unsubscribe();

    __isCurrentUserACandidate = () => {
        const {currentUser} = store.getState().users;
        return this.state.item.applicants.length !== 0 &&
            this.state.item.applicants
            .filter(it => it.id === currentUser.id) !== []
    };

    __apply = () => store.dispatch(
        JobActions.apply(this.state.item.id, this.state.token));

    __unapply = () => store.dispatch(
        JobActions.unapply(this.state.item.id, this.state.token));

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
            <ScrollView style={{flex: 1}}>
                <Box flexDirection={'column'} style={{margin: 20}}>
                <Text style={{marginRight: 20, fontSize: 18}}>
                    {moment(this.state.item.createdBy).fromNow()}</Text>
                <Text style={{fontSize: 26, fontWeight: 'bold'}}>
                    {this.state.item.title}
                </Text>
                <Text style={{marginTop: 10, fontSize: 22}}>
                    {this.state.item.position}
                </Text>
                <Text style={{fontWeight: 'bold', marginTop: 10, fontSize: 18}}>
                    {this.state.item.company}
                </Text><ItemUser {...this.props} item={this.state.item.author}/>
                <Text style={{marginTop: 10, fontSize: 16}}>
                    {this.state.item.text}
                </Text>
                <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
                    {"Candidates"}
                </Text>
            </Box>
                <Box flexDirection={'column'}>
                    <FlatList
                        style={{marginBottom: 40, marginTop: 20,
                            overflow: 'visible'}}
                        data={this.state.item.applicants}
                        keyExtractor={(item, id) => id}
                        renderItem={({item}) =>
                            <ItemUser {...this.props} item={item}/>} />
                    <Button
                        backgroundColor={Colors.BLUE}
                        text={this.__isCurrentUserACandidate() ?
                            "UNAPPLY" :" APPLY"}
                        height={70}
                        width={'100%'}
                        flex={null}
                        onPress={() => this.__isCurrentUserACandidate() ?
                            this.__unapply(): this.__apply()}/>
                </Box>

            </ScrollView>
        </Screen>
}