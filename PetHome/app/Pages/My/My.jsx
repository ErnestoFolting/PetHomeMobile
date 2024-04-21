import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Colors from "../../Constants/Colors";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import MyRequests from "./Requests/MyRequests";
import MyAdverts from "./Adverts/MyAdverts";

const My = () => {

    const Tab = createMaterialTopTabNavigator()
    return (
        <Tab.Navigator>
            <Tab.Screen name="Оголошення" component={MyAdverts} options={{
                tabBarIcon: () => <FontAwesome5 name="list-ul" size={20} color={Colors.main} />
            }} />
            <Tab.Screen name="Заявки" component={MyRequests} options={{
                tabBarIcon: () => <Feather name="user-check" size={20} color={Colors.main} />
            }} />
        </Tab.Navigator>
    )
}

export default My