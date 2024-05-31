import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AdvertService from '../../HTTP/API/AdvertService';
import useStore from '../../Hooks/useAuth';
import CreateAdvertForm from '../../Components/Adverts/CreateAdvertForm/CreateAdvertForm';

const CreateAdvert = () => {
    const store = useStore();

    const mockData = {
        name: 'Назва',
        description: 'Опис оголошення',
        cost: '250',
        startTime: '',
        endTime: '',
        location: 'Fastiv',
        locationLat: 50,
        locationLng: 50,
    }
    const [advertData, setAdvertData] = useState({
        ...mockData
    });

    const [imageUri, setImageUri] = useState('');
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
            setAdvertData({ ...mockData })
            setImageUri('')
            store.setAdvertsNeedUpdate(!store.advertsNeedUpdate)
            alert('Створено')
        } catch (e) {
            alert(JSON.stringify(e?.response?.data))
            console.log(e?.response?.data)
        }
        setIsLoading(false)
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <CreateAdvertForm advertData={advertData} setAdvertData={setAdvertData} imageUri={imageUri} handleSubmit={handleSubmit} setImageUri={setImageUri} isLoading={isLoading} />

        </KeyboardAvoidingView>
    );
};

export default CreateAdvert