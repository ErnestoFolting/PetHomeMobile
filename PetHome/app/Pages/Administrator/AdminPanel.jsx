
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import AdminUsers from './AdminUsers/AdminUsers';
import AdminAdverts from './AdminAdverts/AdminAdverts';
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from '../../Constants/Colors';
import UserProfile from '../UserProfile/UserProfile';

export default function AdminPanel({ theme, Tab, Stack }) {
    const AdminUsersStack = () => {
        return (<Stack.Navigator>
            <Stack.Screen name="Перелік користувачів" component={AdminUsers} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Профіль" component={UserProfile} options={{
                headerShown: false
            }} />
        </Stack.Navigator>)
    }


    return (
        <NavigationContainer theme={theme} >
            <Tab.Navigator>
                <Tab.Screen name="Всі користувачі" component={AdminUsersStack}
                    options={{
                        tabBarIcon: () => <Ionicons name="person-outline" size={24} color={Colors.main} />
                    }}
                />
                <Tab.Screen name="Всі оголошення" component={AdminAdverts}
                    options={{
                        tabBarIcon: () => <FontAwesome5 name="dog" color={Colors.main} size={24} />
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}