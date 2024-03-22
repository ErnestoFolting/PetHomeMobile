import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import LoginStyles from "./LoginStyles";
import logo from '../../../assets/logo.png'
import useAuth from "../../Hooks/useAuth";

const Login = () => {
    const [creds, setCreds] = useState({ username: "", password: "" });

    const auth = useAuth();

    const handleRegister = () => {
        console.log('to reg');
    }

    const handleLogin = () => {
        auth.login(creds)
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={LoginStyles.container}>
                    <Image source={logo} style={LoginStyles.logo} />
                    <View style={LoginStyles.form}>
                        <Text style={LoginStyles.authorization}>Authorization</Text>
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
                        <View style={LoginStyles.registerContainer}>
                            <Text style={LoginStyles.noacc}>Do not have an account?</Text>
                            <TouchableOpacity onPress={handleRegister}>
                                <Text style={LoginStyles.registerLink}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Login;
