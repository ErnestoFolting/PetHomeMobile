import { View, Button, TouchableOpacity } from "react-native"
import React from "react"
import useAuth from "../Hooks/useAuth";
import { FontAwesome5, Ionicons, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react-lite"
import My from "../Pages/My/My";
import Adverts from "../Pages/Adverts/Adverts";
import Colors from "../Constants/Colors";
import Me from "../Pages/Me/Me";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//temp
const Сheck = observer(() => {
    const auth = useAuth()
    return (<View><Button title="check" onPress={() => { console.log("check") }} color={Colors.main} ></Button></View>)
})

export default observer(function Navigator() {
    const auth = useAuth();
    console.log("Auth " + auth.isAuth);
    return (
        auth.isAuth ? (
            <NavigationContainer >
                <Tab.Navigator>
                    <Tab.Screen name="Adverts" component={Adverts}
                        options={{
                            tabBarIcon: () => <FontAwesome5 name="dog" color={Colors.main} size={24} />
                        }} />
                    <Tab.Screen name="Create" component={Сheck}
                        options={{
                            tabBarIcon: () => <Ionicons name="create-outline" size={24} color={Colors.main} />
                        }} />
                    <Tab.Screen name="My" component={My}
                        options={{
                            tabBarIcon: () => <AntDesign name="folder1" size={24} color={Colors.main} />
                        }} />
                    <Tab.Screen name="Me" component={Me}
                        options={{
                            tabBarIcon: () => <Ionicons name="person-outline" size={24} color={Colors.main} />,
                            headerRight: () => (
                                <TouchableOpacity onPress={auth.logout}>
                                    <Ionicons name="exit-outline" size={24} color={Colors.main} style={{ marginRight: 20 }} />
                                </TouchableOpacity>
                            ),
                        }} />
                </Tab.Navigator>
            </NavigationContainer>
        ) : (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Registration" component={Registration} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    );
});