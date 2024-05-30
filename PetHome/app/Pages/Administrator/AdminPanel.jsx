
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import AdminUsers from './AdminUsers/AdminUsers';
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from '../../Constants/Colors';
import UserProfile from '../UserProfile/UserProfile';
import { TouchableOpacity, View, Text } from 'react-native';
import useStore from '../../Hooks/useAuth';

export default function AdminPanel({ theme, Tab, Stack, advertsStack }) {
    const store = useStore()
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

    const logoutBtn = <TouchableOpacity onPress={store.logout}>
        <Ionicons name="exit-outline" size={24} color={Colors.main} style={{ marginLeft: 20 }} />
    </TouchableOpacity>

    const adminTitle = <View style={{ backgroundColor: Colors.red, marginRight: 20, padding: 3, borderRadius: 5, }}><Text style={{ color: 'white' }}>Адміністратор</Text></View>

    return (
        <NavigationContainer theme={theme} >
            <Tab.Navigator>
                <Tab.Screen name="Всі оголошення" component={advertsStack}
                    options={{
                        tabBarIcon: () => <FontAwesome5 name="dog" color={Colors.main} size={24} />,
                        headerLeft: () => (logoutBtn),
                        headerRight: () => (adminTitle)
                    }}

                />
                <Tab.Screen name="Всі користувачі" component={AdminUsersStack}
                    options={{
                        tabBarIcon: () => <Ionicons name="person-outline" size={24} color={Colors.main} />,
                        headerLeft: () => (logoutBtn),
                        headerRight: () => (adminTitle)
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}