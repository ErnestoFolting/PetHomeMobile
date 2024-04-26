import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
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

const AdvertDetail = ({ route, navigation }) => {
    const store = useStore()
    const { adId } = route.params;
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
                console.log('here');
                store.setAdvertsNeedUpdate(!store.advertsNeedUpdate)
                navigation.goBack()
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
        <ScrollView contentContainerStyle={AdvertDetailStyles.container}>

            <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} content={<Text>{error}{advertRequestErrors}</Text>}></MyModal>
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

            {store.userId !== advert?.ownerId && <AdvertRequestBlock advertStatus={advert?.status} advertId={adId} setIsModalVisible={setIsModalVisible} setAdvertRequestErrors={setAdvertRequestErrors} />}

            {store.userId == advert?.ownerId ?
                <PerformersSelectionBlock navigation={navigation} advertId={adId} />
                :
                <ProfileItem navigation={navigation} title="Власник" profileData={advert?.owner} id={advert?.owner?.id} isBig />
            }

        </ScrollView>
    )
}
export default observer(AdvertDetail)