import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../Constants/Colors";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import MyRequests from "./Requests/MyRequests";
import Adverts from "../Adverts/Adverts";
import AdvertDetail from "../AdvertDetail/AdvertDetail";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const MyAdvertsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Перелік моїх оголошень"
                component={Adverts}
                options={{
                    headerShown: false
                }}
                initialParams={{
                    isUserAdverts: true
                }}
            />
            <Stack.Screen
                name="Деталі мого оголошення"
                component={AdvertDetail}
                options={{
                    headerShown: false
                }} />
        </Stack.Navigator>
    );
};

const MyRequestsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Перелік моїх оголошень" component={MyRequests} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Деталі мого оголошення" component={AdvertDetail} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    );
};

const My = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Мої оголошення"
                component={MyAdvertsStack}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name="list-ul" size={20} color={Colors.main} />
                    ),
                }}
            />
            <Tab.Screen
                name="Мої заявки"
                component={MyRequestsStack}
                options={{
                    tabBarIcon: () => (
                        <Feather name="user-check" size={20} color={Colors.main} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default My;
