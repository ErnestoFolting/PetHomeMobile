import { View, Button, TouchableOpacity, Text } from "react-native"
import React, { useEffect, useState } from "react"
import useAuth from "../Hooks/useAuth";
import { FontAwesome5, Ionicons, AntDesign, Entypo, Feather } from "@expo/vector-icons";
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
import Loader from "./Loader/Loader";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Сheck = observer(() => {
    return (<View><Button title="check" onPress={() => { console.log("check") }} color={Colors.main} ></Button></View>)
})

export default observer(function Navigator() {
    const [isEditing, setIsEditing] = useState(false)
    const auth = useAuth();

    useEffect(() => {
        async function checkAuth() {
            await auth.checkAuth()
            auth.setLoading(false)
        }
        checkAuth()
    }, []);

    useEffect(() => {
        if (auth) {
            setIsEditing(auth.isEditing)
        }

    }, [auth.isEditing]);

    if (auth.isLoading) {
        return <Loader />
    }

    return (
        auth.isAuth ? (
            <NavigationContainer >
                <Tab.Navigator>
                    <Tab.Screen name="Оголошення" component={Adverts}
                        options={{
                            tabBarIcon: () => <FontAwesome5 name="dog" color={Colors.main} size={24} />
                        }} />
                    <Tab.Screen name="Створити" component={Сheck}
                        options={{
                            tabBarIcon: () => <Ionicons name="create-outline" size={24} color={Colors.main} />
                        }} />
                    <Tab.Screen name="Мої" component={My}
                        options={{
                            tabBarIcon: () => <AntDesign name="folder1" size={24} color={Colors.main} />
                        }} />
                    <Tab.Screen name="Я" component={Me}
                        options={{
                            tabBarIcon: () => <Ionicons name="person-outline" size={24} color={Colors.main} />,
                            headerLeft: () => (
                                <TouchableOpacity onPress={auth.logout}>
                                    <Ionicons name="exit-outline" size={24} color={Colors.main} style={{ marginLeft: 20 }} />
                                </TouchableOpacity>
                            ),
                            headerRight: () => isEditing
                                ? (
                                    <TouchableOpacity onPress={() => auth.setIsEditing(!auth.isEditing)}>
                                        <Feather name="check" size={24} color={Colors.main} style={{ marginRight: 20 }} />
                                    </TouchableOpacity>
                                )
                                : (
                                    <TouchableOpacity onPress={() => auth.setIsEditing(!auth.isEditing)}>
                                        <Entypo name="edit" size={20} color={Colors.main} style={{ marginRight: 20 }} />
                                    </TouchableOpacity>
                                ),
                        }} />
                </Tab.Navigator>
            </NavigationContainer>
        ) : (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Логін" component={Login} />
                    <Stack.Screen name="Реєстрація" component={Registration} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    );
});