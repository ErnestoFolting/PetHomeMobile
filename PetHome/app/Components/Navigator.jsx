import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import useAuth from '../Hooks/useAuth';
import { FontAwesome5, Ionicons, AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite"
import My from '../Pages/My/My';
import Adverts from '../Pages/Adverts/Adverts';
import Colors from '../Constants/Colors';
import Me from '../Pages/Me/Me';
import Login from '../Pages/Login/Login';

const Tab = createBottomTabNavigator();

//temp
const Сheck = observer(() => {
    const auth = useAuth()
    return (<View><Button title="check" onPress={() => { console.log('check') }} color={Colors.main} ></Button></View>)
})

export default function Navigator() {
    const auth = useAuth();
    console.log('here ' + auth.isAuth);
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
                            tabBarIcon: () => <Ionicons name="person-outline" size={24} color={Colors.main} />
                        }} />
                </Tab.Navigator>
            </NavigationContainer>
        ) : (
            <Login></Login>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered: {
    },
});