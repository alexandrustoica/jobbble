import {Colors} from "../../elements/color/Colors";
import {Box} from "../../elements/box/Box";
import React from "react";
import {HBox} from "../../elements/box/HBox";
import {Text, TouchableOpacity} from "react-native";

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

const TitleStyle = {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold'
};

const DateStyle = {
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 20,
};


const Cover = (props) =>
    <Box alignItems={'center'}
         justifyContent={'center'}
         style={[{backgroundColor: props.coverColor}]}>
    </Box>;


export const ItemJob = (props) =>
    <TouchableOpacity
        activeOpacity={1.0}
        onPress={() =>
            props.navigation.navigate('Job', {item: props.item})}
        style={CardStyle}>
        <Cover {...props}/>
        <HBox style={{paddingRight: 20}}>
            <Box flexDirection={'column'}>
                <Text style={TitleStyle}>{props.item.title}</Text>
                <Text style={DateStyle}>{props.item.createBy}</Text>
            </Box>
        </HBox>
    </TouchableOpacity>;

ItemJob.defaultProps = {
    item: {
        title: "test",
        createdBy: "Test",
    },
    coverColor: Colors.LIGHT_BLUE
};