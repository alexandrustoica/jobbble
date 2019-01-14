import {Colors} from "../../elements/color/Colors";
import {Box} from "../../elements/box/Box";
import React from "react";
import {HBox} from "../../elements/box/HBox";
import {Text, TouchableOpacity} from "react-native";
import {Image} from "react-native";

const CardStyle = {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: Colors.BLUE,
    shadowOffset: {
        width: 0,
        height: 10
    },
    shadowRadius: 10,
    shadowOpacity: 0.15,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
};

const SubtitleStyle = {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'regular'
};

const TitleStyle = {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold'
};

const Cover = (props) =>
    <Box alignItems={'center'}
         justifyContent={'center'}
         style={[{backgroundColor: props.coverColor}]}>
    </Box>;

export const ItemUser = (props) =>
    <TouchableOpacity
        activeOpacity={1.0}
        onPress={() =>
            props.navigation.navigate('User', {userId: props.item.id})}
        style={CardStyle}>
        <HBox style={{padding: 10,
            alignItems: 'center',
            justifyContent: 'center'}}>
            <Image style={{width: 50, height: 50}}
                   borderRadius={25}
                   source={{uri: props.item.profileImageUrl}}/>
            <Box flexDirection={'column'}>
                <Text style={TitleStyle}>{props.item.name}</Text>
                <Text style={SubtitleStyle}>{`@${props.item.username}`}</Text>
            </Box>
        </HBox>
    </TouchableOpacity>;

ItemUser.defaultProps = {
    item: {
        profileImageUrl: 'test',
        title: "test",
    },
    coverColor: Colors.LIGHT_BLUE
};