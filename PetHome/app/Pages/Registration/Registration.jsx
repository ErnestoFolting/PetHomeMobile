import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { RegistrationStyles } from './RegistrationStyles';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AuthService from '../../HTTP/API/AuthService';
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import Loader from '../../Components/Loader/Loader';
import PlacesAutocomplete from '../../Components/PlacesAutocomplete/PlacesAutocomplete';

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

    const [deniedAccess, setDeniedAccess] = useState(false)
    const [imageUri, SetImageUri] = useState('')
    const [isLocationLoading, setIsLocationLoading] = useState(false)

    const handleSubmit = async () => {

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
        }

        try {
            await AuthService.registration(formData)
        } catch (e) {
            console.log(e?.response?.data)
            throw e
        }

        navigation.navigate('Логін')
    };

    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            setDeniedAccess(true)
            return;
        }
        try {
            setIsLocationLoading(true)
            // let locationResult = await Location.getCurrentPositionAsync({});
            // let { latitude, longitude } = locationResult.coords;
            let latitude = 50.0802105243495
            let longitude = 29.925069074247297
            const geocodeResponse = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });

            if (geocodeResponse.length > 0) {
                const { street, city, region } = geocodeResponse[0];
                const location = ((street !== null ? `${street}, ` : ``) + (city !== null ? `${city}, ` : ``) + (region !== null ? `${region}` : ``))
                setRegistrationData({ ...registrationData, location: location, locationLat: String(latitude)?.replace('.', ','), locationLng: String(longitude)?.replace('.', ',') })
            }
        } catch (e) {
            Alert.alert(e);
        } finally {
            setIsLocationLoading(false)
        }
    }

    const autoCompleteHandler = (data, details = null) => {
        console.log('here');
    }

    const selectImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (!pickerResult.cancelled) {
            const uri = pickerResult.assets[0].uri;
            console.log(uri);
            SetImageUri(uri)
        }
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
                        style={RegistrationStyles.input}
                    />


                    <TextInput
                        placeholder="Ім'я*"
                        value={registrationData.name}
                        onChangeText={text => setRegistrationData({ ...registrationData, name: text })}
                        style={RegistrationStyles.input}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                        <TouchableOpacity onPress={() => setRegistrationData({ ...registrationData, sex: 'male' })}>
                            <Text style={[RegistrationStyles.radioText, { marginRight: 20 }, registrationData.sex === 'male' && RegistrationStyles.radioChecked]}>Чоловік</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setRegistrationData({ ...registrationData, sex: 'female' })}>
                            <Text style={[RegistrationStyles.radioText, registrationData.sex === 'female' && RegistrationStyles.radioChecked]}>Жінка</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={selectImage} style={RegistrationStyles.imageInput}>
                        <Text style={RegistrationStyles.imageInputLabel}>Ваше фото*</Text>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
                        ) : (
                            <Text style={{ color: 'gray' }}>Tap to select image</Text>
                        )}
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Email*"
                        value={registrationData.email}
                        onChangeText={text => setRegistrationData({ ...registrationData, email: text })}
                        style={RegistrationStyles.input}
                    />

                    <TextInput
                        placeholder="Номер телефону(+380)*"
                        value={registrationData.phoneNumber}
                        onChangeText={text => setRegistrationData({ ...registrationData, phoneNumber: text })}
                        style={RegistrationStyles.input}
                    />

                    <TextInput
                        placeholder="Логін*"
                        value={registrationData.username}
                        onChangeText={text => setRegistrationData({ ...registrationData, username: text })}
                        style={RegistrationStyles.input}
                    />

                    <TextInput
                        placeholder="Пароль*"
                        value={registrationData.password}
                        onChangeText={text => setRegistrationData({ ...registrationData, password: text })}
                        style={RegistrationStyles.input}
                        secureTextEntry
                    />

                    <TextInput
                        placeholder="Підтвердження*"
                        value={registrationData.confirmPassword}
                        onChangeText={text => setRegistrationData({ ...registrationData, confirmPassword: text })}
                        style={RegistrationStyles.input}
                        secureTextEntry
                    />
                    {registrationData?.location == "Fastiv" ? (isLocationLoading ? <Loader /> : <TouchableOpacity onPress={getUserLocation}>
                        <Text style={{ textAlign: 'center', marginVertical: 10 }}>Моя локація</Text>
                    </TouchableOpacity>) : <Text>📍{registrationData?.location}</Text>}

                    <PlacesAutocomplete autoCompleteHandler={autoCompleteHandler} />

                    <TouchableOpacity onPress={handleSubmit} style={RegistrationStyles.button}>
                        <Text style={RegistrationStyles.buttonText}>Зареєструватись</Text>
                    </TouchableOpacity></View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Registration;
