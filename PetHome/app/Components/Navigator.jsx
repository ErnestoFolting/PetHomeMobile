import { View, Button, TouchableOpacity, Text } from "react-native"
import React, { useEffect } from "react"
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

const Сheck = observer(() => {
    return (<View><Button title="check" onPress={() => { console.log("check") }} color={Colors.main} ></Button></View>)
})

export default observer(function Navigator() {
    const auth = useAuth();

    useEffect(() => {
        async function checkAuth() {
            await auth.checkAuth()
            auth.setLoading(false)
        }
        checkAuth()
    }, []);

    console.log("Auth " + auth.isAuth);
    console.log("User id " + auth.userId);

    if (auth.isLoading) {
        return <View><Text>Завантаження</Text></View>
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
                    <Stack.Screen name="Логін" component={Login} />
                    <Stack.Screen name="Реєстрація" component={Registration} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    );
});