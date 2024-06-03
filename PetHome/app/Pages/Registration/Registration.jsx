import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { RegistrationStyles } from './RegistrationStyles';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AuthService from '../../HTTP/API/AuthService';
import { useNavigation } from "@react-navigation/native";
import LocationBlock from '../../Components/Location/LocationBlock/LocationBlock';
import Loader from '../../Components/Loader/Loader';
import ImageSelector from '../../Components/ImageSelector/ImageSelector';
import registrationSchema from './RegistrationValidation';
import * as Yup from 'yup';

const Registration = () => {
    const navigation = useNavigation();

    const [registrationData, setRegistrationData] = useState({
        surname: 'test',
        name: 'test',
        sex: 'male',
        email: 'test@gmail.com',
        phoneNumber: '+380678965067',
        username: 'testUser',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        location: 'Fastiv',
        locationLat: '50,5',
        locationLng: '52,5'
    });

    const [imageUri, SetImageUri] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({});
    const [isLocationChanging, setIsLocationChanging] = useState(false)

    const handleSubmit = async () => {
        setIsLoading(true)

        try {
            await registrationSchema.validate(registrationData, { abortEarly: false });
            const formData = new FormData();

            Object.keys(registrationData).forEach(function (key, index) {
                formData.append(key, Object.values(registrationData)[index])
            })
            if (imageUri !== '') {
                const photoData = await FileSystem.readAsStringAsync(imageUri, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                formData.append('userPhoto', {
                    uri: imageUri,
                    name: `photo_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`,
                    type: `image/jpeg`,
                    data: photoData,
                });
            } else {
                Alert.alert('Оберіть фото');
                setIsLoading(false)
                return
            }

            try {
                await AuthService.registration(formData)
                navigation.navigate('Логін')

            } catch (e) {
                console.log(e?.response?.data)
                Alert.alert(JSON.stringify(e?.response?.data))
            }
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const newErrors = {};
                err.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                });
                console.log(newErrors);
                setErrors(newErrors);
            }
        }

        setIsLoading(false)
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }} keyboardShouldPersistTaps={'handled'} >
                <View style={RegistrationStyles.form}>
                    <TextInput
                        placeholder='Прізвище*'
                        value={registrationData.surname}
                        onChangeText={text => setRegistrationData({ ...registrationData, surname: text })}
                        style={[RegistrationStyles.input, errors.surname && RegistrationStyles.errorInput]}
                    />

                    <TextInput
                        placeholder="Ім'я*"
                        value={registrationData.name}
                        onChangeText={text => setRegistrationData({ ...registrationData, name: text })}
                        style={[RegistrationStyles.input, errors.name && RegistrationStyles.errorInput]}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                        <TouchableOpacity onPress={() => setRegistrationData({ ...registrationData, sex: 'male' })}>
                            <Text style={[RegistrationStyles.radioText, { marginRight: 20 }, registrationData.sex === 'male' && RegistrationStyles.radioChecked]}>Чоловік</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setRegistrationData({ ...registrationData, sex: 'female' })}>
                            <Text style={[RegistrationStyles.radioText, registrationData.sex === 'female' && RegistrationStyles.radioChecked]}>Жінка</Text>
                        </TouchableOpacity>
                    </View>

                    <ImageSelector imageUri={imageUri} setImageUri={SetImageUri} />

                    <TextInput
                        placeholder="Email*"
                        value={registrationData.email}
                        onChangeText={text => setRegistrationData({ ...registrationData, email: text })}
                        style={[RegistrationStyles.input, errors.email && RegistrationStyles.errorInput]}
                    />

                    <TextInput
                        placeholder="Номер телефону(+380)*"
                        value={registrationData.phoneNumber}
                        onChangeText={text => setRegistrationData({ ...registrationData, phoneNumber: text })}
                        style={[RegistrationStyles.input, errors.phoneNumber && RegistrationStyles.errorInput]}
                    />

                    <TextInput
                        placeholder="Логін*"
                        value={registrationData.username}
                        onChangeText={text => setRegistrationData({ ...registrationData, username: text })}
                        style={[RegistrationStyles.input, errors.username && RegistrationStyles.errorInput]}
                    />

                    <TextInput
                        placeholder="Пароль*"
                        value={registrationData.password}
                        onChangeText={text => setRegistrationData({ ...registrationData, password: text })}
                        style={[RegistrationStyles.input, errors.password && RegistrationStyles.errorInput]}
                        secureTextEntry
                    />

                    <TextInput
                        placeholder="Підтвердження*"
                        value={registrationData.confirmPassword}
                        onChangeText={text => setRegistrationData({ ...registrationData, confirmPassword: text })}
                        style={[RegistrationStyles.input, errors.confirmPassword && RegistrationStyles.errorInput]}
                        secureTextEntry
                    />

                    <LocationBlock data={registrationData} setData={setRegistrationData} setIsLocationChanging={setIsLocationChanging} />

                    {
                        isLoading
                            ? <Loader />
                            : <TouchableOpacity onPress={handleSubmit} style={RegistrationStyles.button}>
                                <Text style={RegistrationStyles.buttonText}>Зареєструватись</Text>
                            </TouchableOpacity>
                    }
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Registration;
