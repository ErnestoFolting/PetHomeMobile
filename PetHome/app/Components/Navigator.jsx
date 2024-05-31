import { TouchableOpacity, Vibration } from "react-native"
import React, { useEffect, useState } from "react"
import useStore from "../Hooks/useAuth";
import { FontAwesome5, Ionicons, AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react-lite"
import My from "../Pages/My/My";
import Adverts from "../Pages/Adverts/Adverts";
import Colors from "../Constants/Colors";
import Me from "../Pages/Me/Me";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Loader from "./Loader/Loader";
import AdvertDetail from "../Pages/AdvertDetail/AdvertDetail";
import UserProfile from "../Pages/UserProfile/UserProfile";
import CreateAdvert from "../Pages/CreateAdvert/CreateAdvert";
import AdminPanel from "../Pages/Administrator/AdminPanel";
import Toast from 'react-native-toast-message'
import UserNotification from "./Notifications/UserNotification";
import AdvertNotification from "./Notifications/AdvertNotification/AdvertNotification";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
    },
};

export default observer(function Navigator() {
    const [isEditing, setIsEditing] = useState(false)
    const store = useStore();

    useEffect(() => {
        async function checkAuth() {
            await store.checkAuth()
            store.setLoading(false)
        }
        checkAuth()
    }, []);

    useEffect(() => {
        if (store) {
            setIsEditing(store.isEditing)
        }
    }, [store.isEditing]);

    const toastConfig = {
        notificationUserToast: ({ props }) => (
            < UserNotification {...props} />
        ),
        notificationAdvertToast: ({ props }) => (
            < AdvertNotification {...props} />
        )
    };

    useEffect(() => {
        async function createHubConnection() {
            await store.createHubConnection()
        }
        if (store.isAuth) {
            createHubConnection()
        }
    }, [store.isAuth]);

    const hideToast = () => Toast.hide()

    useEffect(() => {
        if (store?.myHubConnection) {
            store?.myHubConnection?.on("Apply", (request) => {
                Toast.show({
                    type: 'notificationUserToast',
                    props: {
                        request: request,
                        status: "apply",
                        navigationRef: navigationRef,
                        hide: hideToast
                    }
                });
            })
            store?.myHubConnection?.on("Delete", (deletedRequest) => {
                Toast.show({
                    type: 'notificationUserToast',
                    props: {
                        request: deletedRequest,
                        status: "delete",
                        navigationRef: navigationRef,
                        hide: hideToast
                    }
                });
            })
            store?.myHubConnection?.on("Send", (advert) => {
                Toast.show({
                    type: 'notificationAdvertToast',
                    props: {
                        advert: advert,
                        status: "generated",
                        navigationRef: navigationRef,
                        hide: hideToast
                    }
                });
            }
            )
            store?.myHubConnection?.on("Confirm", (confirmedRequest) => {
                Toast.show({
                    type: 'notificationAdvertToast',
                    props: {
                        advert: confirmedRequest?.advert,
                        status: "confirm",
                        navigationRef: navigationRef,
                        hide: hideToast
                    }
                });
            })
            store?.myHubConnection?.on("Reject", (rejectedRequest) => {
                Toast.show({
                    type: 'notificationAdvertToast',
                    props: {
                        advert: rejectedRequest?.advert,
                        status: "reject",
                        navigationRef: navigationRef,
                        hide: hideToast
                    }
                });
            })
        }
    }, [store?.myHubConnection]);

    if (store.isLoading) {
        return <Loader />
    }

    const AdvertsStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Перелік оголошень" component={Adverts} options={{
                    headerShown: false
                }}
                    initialParams={{
                        isUserAdverts: false
                    }} />
                <Stack.Screen name="Деталі" component={AdvertDetail} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Профіль" component={UserProfile} options={{
                    headerShown: false
                }} />
            </Stack.Navigator>
        );
    };

    const navigationRef = React.createRef();

    const authContent = store?.role?.includes("Administrator") ?
        <AdminPanel theme={MyTheme} Tab={Tab} Stack={Stack} advertsStack={AdvertsStack} />
        :
        <NavigationContainer theme={MyTheme} ref={navigationRef}>
            <Tab.Navigator screenOptions={{
                lazy: false
            }}>
                <Tab.Screen name="Оголошення" component={AdvertsStack}
                    options={{
                        tabBarIcon: () => <FontAwesome5 name="dog" color={Colors.main} size={24} />
                    }}
                />
                <Tab.Screen name="Створити" component={CreateAdvert}
                    options={{
                        tabBarIcon: () => <Ionicons name="create-outline" size={24} color={Colors.main} />,
                        lazy: true
                    }} />
                <Tab.Screen name="Мої" component={My}
                    options={{
                        tabBarIcon: () => <AntDesign name="folder1" size={24} color={Colors.main} />
                    }}
                />
                <Tab.Screen name="Я" component={Me}
                    options={{
                        tabBarIcon: () => <Ionicons name="person-outline" size={24} color={Colors.main} />,
                        headerLeft: () => (
                            <TouchableOpacity onPress={store.logout}>
                                <Ionicons name="exit-outline" size={24} color={Colors.main} style={{ marginLeft: 20 }} />
                            </TouchableOpacity>
                        ),
                        headerRight: () => isEditing
                            ? (
                                <TouchableOpacity onPress={() => store.setIsEditing(!store.isEditing)}>
                                    <Feather name="check" size={24} color={Colors.main} style={{ marginRight: 20 }} />
                                </TouchableOpacity>
                            )
                            : (
                                <TouchableOpacity onPress={() => store.setIsEditing(!store.isEditing)}>
                                    <Entypo name="edit" size={20} color={Colors.main} style={{ marginRight: 20 }} />
                                </TouchableOpacity>
                            ),
                    }} />
            </Tab.Navigator>
            <Toast config={toastConfig} autoHide={false} visibilityTime={3500} onShow={() => Vibration.vibrate(50)} topOffset={50} />
        </NavigationContainer>

    return (
        store.isAuth ? (
            authContent
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