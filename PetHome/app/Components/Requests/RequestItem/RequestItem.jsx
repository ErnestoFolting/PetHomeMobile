import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ProfileItem from '../../Profile/ProfileItem'
import RequestItemStyles from './RequestItemStyles'
import useFetching from '../../../Hooks/useFetching'
import RequestService from '../../../HTTP/API/RequestService'
import MyModal from '../../MyModal/MyModal'
import Loader from '../../Loader/Loader'
import useStore from '../../../Hooks/useAuth'

export default function RequestItem({ requestData, navigation, needUpdate, setNeedUpdate }) {

    const store = useStore()

    const [modalVisible, setModalVisible] = useState(false)
    const [sendConfirmRequest, loader, error] = useFetching(async () => {
        await RequestService.confirmRequest(requestData?.id)
    })
    const [sendRejectRequest, loader2, error2] = useFetching(async () => {
        await RequestService.rejectRequest(requestData?.id)
    })

    async function accept() {
        try {
            await sendConfirmRequest()
            updateAdverts()
        } catch (e) {
            setModalVisible(true)
        }

    }
    async function reject() {
        try {
            await sendRejectRequest()
            updateAdverts()
        } catch (e) {
            setModalVisible(true)
        }
    }

    const updateAdverts = () => {
        setNeedUpdate(!needUpdate)
        store.setAdvertsNeedUpdate(!store.advertsNeedUpdate)
    }

    if (loader || loader2) return <Loader />

    return (
        <View style={RequestItemStyles.container}>
            <MyModal isModalVisible={modalVisible} setIsModalVisible={setModalVisible} content={<Text>{error}{error2}</Text>} />
            <View style={RequestItemStyles.profileBlock}><ProfileItem profileData={requestData?.user} navigation={navigation} id={requestData?.userId} /></View>
            <View style={RequestItemStyles.buttonBlock}>
                <TouchableOpacity style={RequestItemStyles.confirmButton}><Text style={{ color: 'white' }} onPress={accept}>Підтвердити</Text></TouchableOpacity>
                <TouchableOpacity style={RequestItemStyles.rejectButton}><Text style={{ color: 'white' }} onPress={reject}>Відхилити</Text></TouchableOpacity>
            </View>
        </View>
    )
}