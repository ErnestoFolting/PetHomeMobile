import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CreateAdvertStyles from './CreateAdvertStyles';

const CreateAdvert = () => {
    const [advertData, setAdvertData] = useState({
        name: '',
        description: '',
        cost: '',
        startTime: '',
        endTime: ''
    });
    const [imageUri, setImageUri] = useState('');

    const handleSubmit = () => {
        console.log(advertData);
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

                    <TextInput
                        placeholder='Початок оголошення (YYYY-MM-DD HH:MM)*'
                        value={advertData.startTime}
                        onChangeText={text => setAdvertData({ ...advertData, startTime: text })}
                        style={CreateAdvertStyles.input}
                    />

                    <TextInput
                        placeholder='Кінець оголошення (YYYY-MM-DD HH:MM)*'
                        value={advertData.endTime}
                        onChangeText={text => setAdvertData({ ...advertData, endTime: text })}
                        style={CreateAdvertStyles.input}
                    />

                    <TouchableOpacity onPress={selectImage} style={CreateAdvertStyles.imageInput}>
                        <Text style={CreateAdvertStyles.imageInputLabel}>Зображення оголошення*</Text>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={CreateAdvertStyles.image} />
                        ) : (
                            <Text style={CreateAdvertStyles.imagePlaceholder}>Торкніться, щоб вибрати зображення</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSubmit} style={CreateAdvertStyles.button}>
                        <Text style={CreateAdvertStyles.buttonText}>Створити оголошення</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    );
};

export default CreateAdvert