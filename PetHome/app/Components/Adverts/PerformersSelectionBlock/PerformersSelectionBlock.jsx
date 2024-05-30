import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import PerformersSelectionBlockStyles from './PerformersSelectionBlockStyles'
import useFetching from '../../../Hooks/useFetching'
import UserDataService from '../../../HTTP/API/UserDataService'
import MyModal from '../../MyModal/MyModal'
import Loader from '../../Loader/Loader'
import RequestItem from '../../Requests/RequestItem/RequestItem'
import ProfileItem from '../../Profile/ProfileItem'
import AdvertService from '../../../HTTP/API/AdvertService'
import useStore from '../../../Hooks/useAuth'

export default function PerformersSelectionBlock({ advertId, navigation, isAdvertDeleted }) {
    const store = useStore()

    const [advert, setAdvert] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [needUpdate, setNeedUpdate] = useState(false)

    const [fetchAdvert, loading, error] = useFetching(async () => {
        const userResponse = await UserDataService.getUserCertainAdvert(advertId)
        setAdvert(userResponse)
    })
    const [markFinished, loading2, error2] = useFetching(async () => {
        const userResponse = await AdvertService.markAsFinished(advertId)
        setAdvert(userResponse)
    })
    const [deleteAdvert, loading3, error3] = useFetching(async () => {
        const userResponse = await AdvertService.deleteAdvert(advertId)
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
    }, [needUpdate])

    const markAsFinished = async () => {
        try {
            await markFinished()
            update()
        } catch (e) {
            console.log(e);
            setIsModalVisible(true)
        }
    }

    const deleteFinishedAdvert = async () => {
        try {
            await deleteAdvert()
            navigation.goBack()
            store.setAdvertsNeedUpdate(!store.advertsNeedUpdate)
        } catch (e) {
            console.log(e);
            setIsModalVisible(true)
        }
    }

    const update = () => {
        setNeedUpdate(!needUpdate)
        store.setAdvertsNeedUpdate(!store.advertsNeedUpdate)
    }

    const requestsToShow = advert?.requests?.filter(el => el.status === 'applied')

    function renderSwitch(status) {
        switch (status) {
            case 'search':
                return requestsToShow?.length === 0
                    ? <Text style={PerformersSelectionBlockStyles.text}>Поки ще ніхто не відгукнувся.</Text>
                    : <View>
                        <Text style={{ marginVertical: 10 }}>Будь ласка, оберіть виконавця.</Text>
                        {requestsToShow.map((el) =>
                            <RequestItem
                                key={el?.id}
                                requestData={el}
                                navigation={navigation}
                                needUpdate={needUpdate}
                                setNeedUpdate={setNeedUpdate}
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
                    <Text style={PerformersSelectionBlockStyles.text}>Виконання завершено.</Text>
                    <TouchableOpacity onPress={deleteFinishedAdvert} style={PerformersSelectionBlockStyles.deleteButton}><Text style={{ color: 'white' }}>Видалити оголошення</Text></TouchableOpacity>
                </View>
            default:
                return <Text style={PerformersSelectionBlockStyles.text}>Видалено</Text>
        }
    }

    if (loading || loading2 || loading3) return <Loader />

    return (
        <View style={PerformersSelectionBlockStyles.container}>
            <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} content={<Text>{error}{error2}{error3}</Text>}></MyModal>
            <Text style={PerformersSelectionBlockStyles.title}>Це ваше оголошення</Text>
            {renderSwitch(advert?.status)}
        </View>
    )
}