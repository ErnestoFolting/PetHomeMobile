import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AdvertService from '../../HTTP/API/AdvertService';
import useStore from '../../Hooks/useAuth';
import CreateAdvertForm from '../../Components/Adverts/CreateAdvertForm/CreateAdvertForm';
import createAdvertSchema from '../../Components/Adverts/CreateAdvertForm/CreateAdvertSchema';
import * as Yup from "yup";
import { parseISO, isValid } from 'date-fns';

const CreateAdvert = () => {
    const store = useStore();

    const mockData = {
        name: 'Назва',
        description: 'Опис оголошення',
        cost: '250',
        startTime: '',
        endTime: '',
        location: '',
        locationLat: 50,
        locationLng: 50,
    }
    const [advertData, setAdvertData] = useState({
        ...mockData
    });

    const [imageUri, setImageUri] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const handleSubmit = async () => {
        const formData = new FormData();
        setIsLoading(true)

        try {
            if (!advertData?.startTime || !advertData?.endTime) {
                alert('Оберіть період виконання')
                setIsLoading(false)
                return;
            }

            await createAdvertSchema.validate(advertData, { abortEarly: false });
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
            } else {
                alert('Оберіть фото')
                setIsLoading(false)
                return;
            }

            try {
                await AdvertService.createAdvert(formData)
                setAdvertData({ ...mockData })
                setImageUri('')
                store.setAdvertsNeedUpdate(!store.advertsNeedUpdate)
                setErrors({})
                alert('Створено')
            } catch (e) {
                alert(JSON.stringify(e?.response?.data))
                console.log(e?.response?.data)
            }
        } catch (e) {
            if (e instanceof Yup.ValidationError) {
                const newErrors = {};
                e.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                    if (error.path == 'location') {
                        alert('Оберіть місцеположення')
                        setIsLoading(false)
                        return;
                    }
                });
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
            <CreateAdvertForm advertData={advertData} setAdvertData={setAdvertData} imageUri={imageUri} handleSubmit={handleSubmit} setImageUri={setImageUri} isLoading={isLoading} errors={errors} />

        </KeyboardAvoidingView>
    );
};

export default CreateAdvert