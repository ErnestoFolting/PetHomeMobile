import { Text, TouchableOpacity, Alert, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import ImageSelectorStyles from './ImageSelectorStyles';
import validateImage from '../../Helpers/FileValidationHelper'

import React from 'react'

export default function ImageSelector({ imageUri, setImageUri }) {

    const selectImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.2,
        });

        if (!pickerResult.canceled) {
            const uri = pickerResult.assets[0].uri;

            const errMsg = await validateImage(uri);

            if (errMsg == "") {
                setImageUri(uri);
            } else {
                Alert.alert(errMsg);
            }
        }
    };
    return (
        <TouchableOpacity onPress={selectImage} style={ImageSelectorStyles.boxInput}>
            <Text style={ImageSelectorStyles.imageInputLabel}>Зображення *</Text>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={ImageSelectorStyles.image} />
            ) : (
                <Text style={ImageSelectorStyles.imagePlaceholder}>Торкніться, щоб вибрати. Не більше 5МБ. Формати jpg,jpeg,png.</Text>
            )}
        </TouchableOpacity>
    )
}