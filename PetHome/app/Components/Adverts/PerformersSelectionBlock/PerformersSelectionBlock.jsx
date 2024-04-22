import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import PerformersSelectionBlockStyles from './PerformersSelectionBlockStyles'
import useFetching from '../../../Hooks/useFetching'
import UserDataService from '../../../HTTP/API/UserDataService'
import MyModal from '../../MyModal/MyModal'
import Loader from '../../Loader/Loader'
import RequestItem from '../../Requests/RequestItem/RequestItem'
import ProfileItem from '../../Profile/ProfileItem'

export default function PerformersSelectionBlock({ advertId, navigation }) {

    const [advert, setAdvert] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [fetchAdvert, loading, error] = useFetching(async () => {
        const userResponse = await UserDataService.getUserCertainAdvert(advertId)
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

    const markAsFinished = () => {
        console.log('mark finished')
    }

    const deleteFinishedAdvert = () => {
        console.log('delere finished')
    }

    function renderSwitch(status) {
        switch (status) {
            case 'search':
                return advert?.requests?.length === 0
                    ? <Text style={{ textAlign: 'center' }}>Поки ще ніхто не відгукнувся.</Text>
                    : <View>
                        <Text style={{ marginVertical: 10 }}>Будь ласка, оберіть виконавця.</Text>
                        {advert?.requests?.map((el) =>
                            <RequestItem
                                key={el?.id}
                                requestData={el}
                                navigation={navigation}
                            />
                        )}
                    </View>
            case 'process':
                return <View>
                    <View>
                        <ProfileItem title="Виконавець" profileData={advert?.performer} navigation={navigation} id={advert?.performerId} isBig borderRadiusTop />
                        <TouchableOpacity onPress={markAsFinished} style={PerformersSelectionBlockStyles.markFinishedButton}><Text style={{ color: 'white' }}>Позначити оголошення як завершене</Text></TouchableOpacity>
                    </View>

                </View>
            case 'finished':
                return <View className='finishedStatus'>
                    <Text>Виконання завершено.</Text>
                    <TouchableOpacity onPress={deleteFinishedAdvert}>Видалити оголошення</TouchableOpacity>
                </View>
            default:
                return <Text>Очікуємо</Text>
        }
    }

    if (loading) return <Loader />

    return (
        <View style={PerformersSelectionBlockStyles.container}>
            <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} content={<Text>{error}</Text>}></MyModal>
            <Text style={PerformersSelectionBlockStyles.title}>Це ваше оголошення</Text>
            {renderSwitch(advert?.status)}
        </View>
    )
}