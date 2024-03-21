import Adverts from "./Pages/Adverts/Adverts";
import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Ionicons, AntDesign } from "@expo/vector-icons";
import Colors from "./Constants/Colors";
import My from "./Pages/My/My";

const Tab = createBottomTabNavigator();

const Сheck = () => {
  return (<View><Text>check</Text></View>)
}

const App = () => {
  return (<NavigationContainer>
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
      <Tab.Screen name="Me" component={Сheck}
        options={{
          tabBarIcon: () => <Ionicons name="person-outline" size={24} color={Colors.main} />
        }} />
    </Tab.Navigator>
  </NavigationContainer>)
};

export default App;