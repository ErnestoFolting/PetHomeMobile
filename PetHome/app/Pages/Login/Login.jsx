import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import LoginStyles from "./LoginStyles";
import logo from '../../../assets/logo.png'
import useAuth from "../../Hooks/useAuth";

const Login = () => {
    const [creds, setCreds] = useState({ username: "", password: "" });

    const auth = useAuth();

    const handleLogin = () => {
        auth.login(creds)
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <View style={LoginStyles.container}>
                <View style={LoginStyles.form}>
                    <Image source={logo} style={LoginStyles.logo} />
                    <Text style={LoginStyles.label}>Username</Text>
                    <TextInput
                        style={LoginStyles.input}
                        placeholder="Enter your username"
                        value={creds.username}
                        onChangeText={text => setCreds({ ...creds, username: text })}
                    />
                    <Text style={LoginStyles.label}>Password</Text>
                    <TextInput
                        style={LoginStyles.input}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        value={creds.password}
                        onChangeText={text => setCreds({ ...creds, password: text })}
                    />
                    <Button title="Login" onPress={handleLogin} />
                </View>
            </View>
        </TouchableWithoutFeedback>

    );
};



export default Login;
