import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../../Constants/Colors";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { View, Text } from "react-native";

const Сheck = () => {
    return (<View><Text>check</Text></View>)
}

const My = () => {

    const Tab = createMaterialTopTabNavigator()
    return (
        <Tab.Navigator>
            <Tab.Screen name="Adverts" component={Сheck} options={{
                tabBarIcon: () => <FontAwesome5 name="list-ul" size={20} color={Colors.main} />
            }} />
            <Tab.Screen name="Requests" component={Сheck} options={{
                tabBarIcon: () => <Feather name="user-check" size={20} color={Colors.main} />
            }} />
        </Tab.Navigator>
    )
}

export default My