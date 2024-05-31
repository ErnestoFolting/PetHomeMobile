import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Image, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import LoginStyles from "./LoginStyles";
import logo from '../../../assets/logo.png'
import useStore from "../../Hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import useFetching from "../../Hooks/useFetching";
import Loader from "../../Components/Loader/Loader";
import MyModal from "../../Components/MyModal/MyModal";

const Login = () => {
    const store = useStore();

    const [creds, setCreds] = useState({ username: "", password: "" });
    const [login, loading, error] = useFetching(async () => {
        await store.login(creds)
    });
    const [isModalVisible, setIsModalVisible] = useState(false)

    const navigation = useNavigation();

    const handleRegister = () => {
        navigation.navigate('Реєстрація')
    }

    const handleLogin = async () => {
        if (creds?.username == '' || creds?.password.length < 8) {
            Alert.alert('Введіть дані');
            return
        }

        try {
            await login()
        } catch (e) {
            setIsModalVisible(true)
        }
    };

    const modal = <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} content={<View><Text>{error}</Text></View>} />

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            {modal}
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
                        {loading ? <Loader /> : <TouchableOpacity onPress={handleLogin} style={LoginStyles.button}>
                            <Text style={LoginStyles.buttonText}>Увійти</Text>
                        </TouchableOpacity>}


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
