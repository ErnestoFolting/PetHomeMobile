import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, Children } from 'react'
import useFetching from '../../Hooks/useFetching';
import AdvertService from '../../HTTP/API/AdvertService';
import Loader from '../../Components/Loader/Loader';
import API_URL from '../../Constants/uri';
import AdvertDetailStyles from './AdvertDetailStyles';
import UkrCalendar from '../../Components/Calendar/UkrCalendar';
import { getDatesBetween } from '../../Components/Calendar/CalendarHelper';
import Colors from '../../Constants/Colors';
import MyModal from '../../Components/MyModal/MyModal';
import AdvertRequestBlock from '../../Components/Adverts/AdvertRequestBlock/AdvertRequestBlock';
import useStore from '../../Hooks/useAuth';
import ProfileItem from '../../Components/Profile/ProfileItem';
import PerformersSelectionBlock from '../../Components/Adverts/PerformersSelectionBlock/PerformersSelectionBlock';
import { observer } from "mobx-react-lite";
import MyButton from '../../Components/Common/MyButton';
import AdminService from '../../HTTP/API/AdminService';
import CreateAdvertForm from '../../Components/Adverts/CreateAdvertForm/CreateAdvertForm';
import * as FileSystem from 'expo-file-system';
import UserDataService from '../../HTTP/API/UserDataService';
import { replaceSigns } from '../../Helpers/StringsHelper';
import shallowEqual from '../Me/helper';
import createAdvertSchema from '../../Components/Adverts/CreateAdvertForm/CreateAdvertSchema';
import * as Yup from "yup";

const AdvertDetail = ({ route, navigation }) => {
    const store = useStore()
    const { adId } = route.params;
    const [advert, setAdvert] = useState({})
    const [photoLoading, setPhotoLoading] = useState(true)
    const [advertRequestErrors, setAdvertRequestErrors] = useState([])
    const [dates, setDates] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isAdvertDeleted, setIsAdvertDeleted] = useState(false)
    const [isAdvertEditing, setIsAdvertEditiong] = useState(false)
    const [imageUri, setImageUri] = useState(''); //advert redo
    const [isLoading, setIsLoading] = useState(false) //advert redo
    const [advertCopy, setAdvertCopy] = useState({}) //advert redo
    const [errors, setErrors] = useState({}) //advert redo

    const [fetchAdvert, loading, error] = useFetching(async () => {
        const userResponse = await AdvertService.getCertainAdvert(adId)
        setAdvert(userResponse)
        setAdvertCopy(userResponse)
    })

    const [deleteAdvertByAdmin, loading2, error2] = useFetching(async () => {
        await AdminService.deleteAdvert(adId)
    })

    const [deleteAdvertByOwner, loading3, error3] = useFetching(async () => {
        await AdvertService.deleteAdvert(adId)
    })

    const deleteHandler = async () => {
        try {
            if (store.userId !== advert?.ownerId) {
                await deleteAdvertByAdmin()
            } else {
                await deleteAdvertByOwner()
            }
            store.setAdvertsNeedUpdate(!store.advertsNeedUpdate)
            setIsAdvertDeleted(true)
            navigation.goBack()
        } catch (e) {
            console.log(e);
            setIsModalVisible(true)
        }
    }

    async function fetchData() {
        try {
            await fetchAdvert()
        } catch (e) {
            store.setAdvertsNeedUpdate(!store.advertsNeedUpdate)
            navigation.goBack()
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (!isAdvertEditing && !shallowEqual(advert, advertCopy) || imageUri !== '') {
            fetchData()
            setImageUri('')
        }
    }, [isAdvertEditing])


    useEffect(() => {
        if (advert?.startTime && advert?.endTime) {
            const markedDates = {};
            const datesBetween = getDatesBetween(advert?.startTime, advert?.endTime)
            datesBetween.forEach((exception) => {
                markedDates[exception.split('T')[0]] = { selected: true, selectedColor: Colors.red };
            });
            setDates(markedDates)
        }
    }, [advert?.startTime])

    const requestBlock = <AdvertRequestBlock advertStatus={advert?.status} advertId={adId} setIsModalVisible={setIsModalVisible} setAdvertRequestErrors={setAdvertRequestErrors} />

    const deleteButton = <MyButton style={{ flex: 1, width: '100%' }} onPress={deleteHandler}>Видалити </MyButton>

    const deleteAndEditButtons = <View style={{ flexDirection: 'row' }}>
        <MyButton style={{ flex: 1, backgroundColor: Colors.light }} onPress={() => setIsAdvertEditiong(true)}>Редагувати</MyButton>{deleteButton}
    </View>

    const controlBLock = () => {
        if (store?.role?.includes("Administrator")) return deleteButton
        if (store.userId == advert?.ownerId) {
            return deleteAndEditButtons
        } else {
            return requestBlock
        }
    }

    const redoHandler = async () => {

        if (shallowEqual(advert, advertCopy) && imageUri == '') return
        setIsLoading(true)

        const formData = new FormData();

        try {
            await createAdvertSchema.validate(advertCopy, { abortEarly: false });
            Object.keys(advertCopy).forEach(function (key, index) {
                if (key == "locationLat" || key == "locationLng") {
                    formData.append(key, replaceSigns(Object.values(advertCopy)[index]))
                } else {
                    formData.append(key, Object.values(advertCopy)[index])
                }

            })

            if (imageUri) {
                const photoData = await FileSystem.readAsStringAsync(imageUri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                formData.append('advertPhoto', {
                    uri: imageUri,
                    name: `photo_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`,
                    type: `image/jpeg`,
                    data: photoData,
                });
            }

            try {
                await UserDataService.redoUserAdvert(formData, adId)
                store.setAdvertsNeedUpdate(!store.advertsNeedUpdate)
                alert('Відредаговано')
                setErrors({})
            } catch (e) {
                alert(JSON.stringify(e?.response?.data))
            }
        } catch (e) {
            if (e instanceof Yup.ValidationError) {
                const newErrors = {};
                e.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors);
            }
        }

        setIsLoading(false)
    }

    if (loading || loading2 || loading3) return <Loader />

    return (
        <ScrollView contentContainerStyle={AdvertDetailStyles.container} keyboardShouldPersistTaps={'handled'}>

            <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} content={<Text>{error}{advertRequestErrors}{error2}{error3}</Text>}></MyModal>
            <MyModal isModalVisible={isAdvertEditing} setIsModalVisible={setIsAdvertEditiong} content={<CreateAdvertForm advertData={advertCopy} setAdvertData={setAdvertCopy} isModal handleSubmit={redoHandler} imageUri={imageUri} setImageUri={setImageUri} isLoading={isLoading} errors={errors} />}></MyModal>
            {photoLoading && <Loader />}
            <Image
                source={{ uri: API_URL + advert?.photoFilePath }}
                alt="Advertisement Image"
                style={AdvertDetailStyles.image}
                onLoadEnd={() => setPhotoLoading(false)} />

            <View style={AdvertDetailStyles.header}>
                <Text style={AdvertDetailStyles.title}>{advert?.name}</Text>
                <Text style={AdvertDetailStyles.cost}>Виплата: {advert?.cost}₴</Text>
            </View>

            <View style={AdvertDetailStyles.sides}>

                <View style={AdvertDetailStyles.leftSide}>
                    <Text style={AdvertDetailStyles.description}>{advert?.description}</Text>
                    <Text style={AdvertDetailStyles.location}>📍{advert?.location}</Text>
                </View>
                <View style={AdvertDetailStyles.rightSide}>
                    <UkrCalendar markedDates={dates} />
                </View>

            </View>
            {controlBLock()}

            {store.userId == advert?.ownerId ?
                (!isAdvertDeleted && <PerformersSelectionBlock navigation={navigation} advertId={adId} />)
                :
                <ProfileItem navigation={navigation} title="Власник" profileData={advert?.owner} id={advert?.owner?.id} isBig />
            }

        </ScrollView>
    )
}
export default observer(AdvertDetail)