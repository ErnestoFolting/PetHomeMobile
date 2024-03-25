import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { RegistrationStyles } from './RegistrationStyles';

const Registration = ({ route }) => {
    const [formData, setFormData] = useState({
        surname: '',
        name: '',
        sex: 'male',
        email: '',
        phoneNumber: '',
        username: '',
        password: '',
        confirmPassword: '',
        location: '',
        file: null
    });

    const handleSubmit = () => {
        // Submit the form
        route.params.onSubmit(formData);
    };

    const getUserLocation = () => {
        console.log('get location');
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
                <View style={RegistrationStyles.form}>
                    <TextInput
                        placeholder='Прізвище*'
                        value={formData.surname}
                        onChangeText={text => setFormData({ ...formData, surname: text })}
                        style={RegistrationStyles.input}
                    />


                    <TextInput
                        placeholder="Ім'я*"
                        value={formData.name}
                        onChangeText={text => setFormData({ ...formData, name: text })}
                        style={RegistrationStyles.input}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                        <TouchableOpacity onPress={() => setFormData({ ...formData, sex: 'male' })}>
                            <Text style={[RegistrationStyles.radioText, { marginRight: 20 }, formData.sex === 'male' && RegistrationStyles.radioChecked]}>Чоловік</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setFormData({ ...formData, sex: 'female' })}>
                            <Text style={[RegistrationStyles.radioText, formData.sex === 'female' && RegistrationStyles.radioChecked]}>Жінка</Text>
                        </TouchableOpacity>
                    </View>


                    <TextInput
                        placeholder="Email*"
                        value={formData.email}
                        onChangeText={text => setFormData({ ...formData, email: text })}
                        style={RegistrationStyles.input}
                    />

                    <TextInput
                        placeholder="Номер телефону(+380)*"
                        value={formData.phoneNumber}
                        onChangeText={text => setFormData({ ...formData, phoneNumber: text })}
                        style={RegistrationStyles.input}
                    />

                    <TextInput
                        placeholder="Логін*"
                        value={formData.username}
                        onChangeText={text => setFormData({ ...formData, username: text })}
                        style={RegistrationStyles.input}
                    />

                    <TextInput
                        placeholder="Пароль*"
                        value={formData.password}
                        onChangeText={text => setFormData({ ...formData, password: text })}
                        style={RegistrationStyles.input}
                        secureTextEntry
                    />

                    <TextInput
                        placeholder="Підтвердження*"
                        value={formData.confirmPassword}
                        onChangeText={text => setFormData({ ...formData, confirmPassword: text })}
                        style={RegistrationStyles.input}
                        secureTextEntry
                    />

                    <TouchableOpacity onPress={getUserLocation}>
                        <Text style={{ textAlign: 'center', marginVertical: 10 }}>Моя локація</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSubmit} style={RegistrationStyles.button}>
                        <Text style={RegistrationStyles.buttonText}>Зареєструватись</Text>
                    </TouchableOpacity></View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Registration;
