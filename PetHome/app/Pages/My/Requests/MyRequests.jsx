import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import MyRequestsStyles from './MyRequestsStyles'
import useFetching from '../../../Hooks/useFetching';
import UserDataService from '../../../HTTP/API/UserDataService';
import MyModal from '../../../Components/MyModal/MyModal';
import AdvertItem from '../../../Components/Adverts/AdvertItem/AdvertItem';
import MyRequestBlock from '../../../Components/Requests/MyRequestBlock';
import Loader from '../../../Components/Loader/Loader';
import { useFocusEffect } from '@react-navigation/native';

export default function MyRequests({ navigation }) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [userRequests, setUserRequests] = useState([])
    const [needUpdate, setNeedUpdate] = useState(false)
    const [getUserRequests, loading, error] = useFetching(async () => {
        setUserRequests(await UserDataService.getUserRequests())
    });

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    async function fetchData() {
        try {
            await getUserRequests()
        } catch (e) {
            setIsModalVisible(true)
        }
    }

    useEffect(() => {
        fetchData()
    }, [needUpdate])

    const modalWindow = isModalVisible && <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} content={<View><Text>{error}</Text></View>} />
    return (
        <ScrollView>
            {modalWindow}
            {userRequests.length === 0 ? <Text style={{ alignSelf: 'center', marginTop: 20 }}>Поки немає заявок</Text> : userRequests.map(el =>
                <View key={el.id} style={MyRequestsStyles.element}>
                    <AdvertItem item={el.advert} disableShadow={true} navigation={navigation} isMy />
                    <MyRequestBlock status={el.status} advertStatus={el.advert.status} requestId={el.id} setNeedUpdate={setNeedUpdate} needUpdate={needUpdate}></MyRequestBlock>
                </View>
            )}
        </ScrollView>
    )
}