import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import useFetching from '../../Hooks/useFetching';
import AdvertService from '../../HTTP/API/AdvertService';
import Loader from '../../Components/Loader/Loader';
import API_URL from '../../Constants/uri';
import AdvertDeatilStyles from './AdvertDetailStyles';
import UkrCalendar from '../../Components/Calendar/UkrCalendar';
import { getDatesBetween } from '../../Components/Calendar/CalendarHelper';
import Colors from '../../Constants/Colors';
import MyModal from '../../Components/MyModal/MyModal';
import AdvertRequestBlock from '../../Components/Adverts/AdvertRequestBlock/AdvertRequestBlock';
import useAuth from '../../Hooks/useAuth';
import ProfileItem from '../../Components/Profile/ProfileItem';
import PerformersSelectionBlock from '../../Components/Adverts/PerformersSelectionBlock/PerformersSelectionBlock';

export default function AdvertDetail({ route, navigation }) {
    const auth = useAuth()
    const { adId, update, setUpdate } = route.params;
    const [advert, setAdvert] = useState({})
    const [photoLoading, setPhotoLoading] = useState(true)
    const [advertRequestErrors, setAdvertRequestErrors] = useState([])
    const [dates, setDates] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)

    const [fetchAdvert, loading, error] = useFetching(async () => {
        const userResponse = await AdvertService.getCertainAdvert(adId)
        setAdvert(userResponse)
    })

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchAdvert()
            } catch (e) {
                setIsModalVisible(true)
            }
        }
        fetchData()
    }, [])

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

    if (loading) return <Loader />

    return (
        <ScrollView contentContainerStyle={AdvertDeatilStyles.container}>

            <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} content={<Text>{error}{advertRequestErrors}</Text>}></MyModal>
            {photoLoading && <Loader />}
            <Image
                source={{ uri: API_URL + advert?.photoFilePath }}
                alt="Advertisement Image"
                style={AdvertDeatilStyles.image}
                onLoadEnd={() => setPhotoLoading(false)} />
            <View style={AdvertDeatilStyles.header}>
                <Text style={AdvertDeatilStyles.title}>{advert?.name}</Text>
                <Text style={AdvertDeatilStyles.cost}>Виплата: {advert?.cost}₴</Text>
            </View>

            <View style={AdvertDeatilStyles.sides}>

                <View style={AdvertDeatilStyles.leftSide}>
                    <Text style={AdvertDeatilStyles.description}>{advert?.description}</Text>
                    <Text style={AdvertDeatilStyles.location}>📍{advert?.location}</Text>
                </View>
                <View style={AdvertDeatilStyles.rightSide}>
                    <UkrCalendar markedDates={dates} />
                </View>

            </View>

            {auth.userId !== advert?.ownerId && <AdvertRequestBlock advertStatus={advert?.status} advertId={adId} setIsModalVisible={setIsModalVisible} setAdvertRequestErrors={setAdvertRequestErrors} />}

            {auth.userId == advert?.ownerId ?
                <PerformersSelectionBlock navigation={navigation} advertId={adId} update={update} setUpdate={setUpdate} />
                :
                <ProfileItem navigation={navigation} title="Власник" profileData={advert?.owner} id={advert?.owner?.id} isBig />
            }

        </ScrollView>
    )
}