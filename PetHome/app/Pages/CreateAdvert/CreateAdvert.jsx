import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CreateAdvertStyles from './CreateAdvertStyles';
import MyModal from '../../Components/MyModal/MyModal';
import AdvertCreationCalendar from '../../Components/Calendar/AdvertCreationCalendar/AdvertCreationCalendar';
import * as FileSystem from 'expo-file-system';
import AdvertService from '../../HTTP/API/AdvertService';
import Loader from '../../Components/Loader/Loader';

const CreateAdvert = ({ navigation }) => {
    const [advertData, setAdvertData] = useState({
        name: 'Назва',
        description: 'Опис оголошення',
        cost: '250',
        startTime: '',
        endTime: '',
        location: 'Fastiv',
        locationLat: 50,
        locationLng: 50,
    });
    const [imageUri, setImageUri] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        const formData = new FormData();

        Object.keys(advertData).forEach(function (key, index) {
            formData.append(key, Object.values(advertData)[index])
        })

        if (imageUri) {
            const photoData = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            formData.append('petPhoto', {
                uri: imageUri,
                name: `photo_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`,
                type: `image/jpeg`,
                data: photoData,
            });
        }


        try {
            setIsLoading(true)
            await AdvertService.createAdvert(formData)
            setAdvertData({ ...advertData, startTime: '', endTime: '' })
            setImageUri('')
            alert('Створено')
        } catch (e) {
            alert(JSON.stringify(e?.response?.data))
            console.log(e?.response?.data)
        }
        setIsLoading(false)
    };

    const selectImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (!pickerResult.cancelled) {
            const uri = pickerResult.assets[0].uri;
            setImageUri(uri);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <MyModal
                content={<View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: 'grey' }}>Оберіть дати</Text>
                    <AdvertCreationCalendar
                        setAdvertData={setAdvertData}
                        advertData={advertData}
                        setIsModalVisible={setIsModalVisible}
                    />
                </View>

                }
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
                <View style={CreateAdvertStyles.form}>
                    <TextInput
                        placeholder='Назва оголошення*'
                        value={advertData.name}
                        onChangeText={text => setAdvertData({ ...advertData, name: text })}
                        style={CreateAdvertStyles.input}
                    />

                    <TextInput
                        placeholder='Опис оголошення'
                        value={advertData.description}
                        onChangeText={text => setAdvertData({ ...advertData, description: text })}
                        style={CreateAdvertStyles.input}
                    />

                    <TextInput
                        placeholder='Вартість*'
                        value={advertData.cost}
                        onChangeText={text => setAdvertData({ ...advertData, cost: text })}
                        style={CreateAdvertStyles.input}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity style={CreateAdvertStyles.boxInput} onPress={() => setIsModalVisible(true)}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>📅 Обрати дати</Text>
                            {advertData?.startTime && <Text style={{ marginTop: 5 }}>{advertData?.startTime} до {advertData?.endTime}</Text>}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={CreateAdvertStyles.boxInput} onPress={() => console.log('location')}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>📍 Моя локація</Text>
                            {advertData?.location && <Text>{advertData.location}</Text>}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={selectImage} style={CreateAdvertStyles.boxInput}>
                        <Text style={CreateAdvertStyles.imageInputLabel}>Зображення оголошення*</Text>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={CreateAdvertStyles.image} />
                        ) : (
                            <Text style={CreateAdvertStyles.imagePlaceholder}>Торкніться, щоб вибрати зображення</Text>
                        )}
                    </TouchableOpacity>
                    {isLoading ? <Loader /> : <TouchableOpacity onPress={handleSubmit} style={CreateAdvertStyles.button}>
                        <Text style={CreateAdvertStyles.buttonText}>Створити оголошення</Text>
                    </TouchableOpacity>}
                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    );
};

export default CreateAdvert