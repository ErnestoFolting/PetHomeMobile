import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import LoginStyles from "./LoginStyles";
import logo from '../../../assets/logo.png'
import useAuth from "../../Hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const [creds, setCreds] = useState({ username: "", password: "" });

    const auth = useAuth();

    const navigation = useNavigation();

    const handleRegister = () => {
        console.log('to reg');
        navigation.navigate('Реєстрація')
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

                    <View style={LoginStyles.form}>
                        <Image source={logo} style={LoginStyles.logo} />

                        <Text style={LoginStyles.label}>Логін</Text>
                        <TextInput
                            style={LoginStyles.input}
                            placeholder="Уведіть свій логін"
                            value={creds.username}
                            onChangeText={text => setCreds({ ...creds, username: text })}
                        />

                        <Text style={LoginStyles.label}>Пароль</Text>
                        <TextInput
                            style={LoginStyles.input}
                            placeholder="Уведіть свій пароль"
                            secureTextEntry={true}
                            value={creds.password}
                            onChangeText={text => setCreds({ ...creds, password: text })}
                        />
                        <TouchableOpacity onPress={handleLogin} style={LoginStyles.button}>
                            <Text style={LoginStyles.buttonText}>Увійти</Text>
                        </TouchableOpacity>

                        <View style={LoginStyles.registerContainer}>
                            <Text style={LoginStyles.noacc}>Не маєш акаунту?</Text>
                            <TouchableOpacity onPress={handleRegister}>
                                <Text style={LoginStyles.registerLink}>Реєстрація</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Login;
