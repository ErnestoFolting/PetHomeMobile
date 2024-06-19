import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useFetching from '../../../Hooks/useFetching'
import AdvertRequestBlockStyles from './AdvertRequestBlockStyles'
import UserDataService from '../../../HTTP/API/UserDataService'
import RequestService from '../../../HTTP/API/RequestService'
import Loader from '../../Loader/Loader'

export default function AdvertRequestBlock({ advertStatus, setIsModalVisible, advertId, setAdvertRequestErrors }) {

    const [userRequests, setUserRequests] = useState([])
    const [checkIfRequestSent, loading, error] = useFetching(async () => {
        setUserRequests(await UserDataService.getUserRequests())
    });
    const [errorApply, setErrorApply] = useState("")
    const [loadingApply, setLoadingApply] = useState(false)
    useEffect(() => {
        async function fetchData() {
            try {
                await checkIfRequestSent()
            } catch (e) {
                setAdvertRequestErrors(error);
                setIsModalVisible(true)
            }
        }
        fetchData()
    }, [loadingApply])

    useEffect(() => {
        if (error && !loading) {
            setAdvertRequestErrors(error);
            setIsModalVisible(true)
        }
    }, [loading])

    const thisAdvertRequestStatus = userRequests?.find(el => el?.advertId === advertId)?.status;

    const applyRequestHandler = async () => {
        setLoadingApply(true)
        try {
            setIsModalVisible(false)
            await RequestService.sendRequest(advertId)
            setAdvertRequestErrors("")
            setErrorApply(null)
        } catch (e) {
            console.log(e?.response?.data);
            setIsModalVisible(true)
            setErrorApply(e?.response?.data)
            setAdvertRequestErrors(e?.response?.data)
        }
        setLoadingApply(false)
    }

    if (loading || loadingApply) return <Loader />

    function renderSwitch(status) {
        let text = ""
        switch (status) {
            case 'rejected':
                text = "На жаль, власник відхилив Вашу пропозицію"
                break
            case 'generated':
                text = "Система підібрала для Вас це оголошення"
                break
            case 'applied':
                text = "Ви подали заявку, очікуйте"
                break
            case 'confirmed':
                text = "Ви виконуєте це замовлення"
                if (advertStatus == 'finished') text = "Ви виконали це замовлення"
                break
            default: {
                text = "Подати заявку"
            }
        }
        return (<View style={[AdvertRequestBlockStyles.container, text == "Подати заявку" && AdvertRequestBlockStyles.shadow]}>
            <TouchableOpacity style={AdvertRequestBlockStyles.applyButton} onPress={applyRequestHandler} disabled={text !== "Подати заявку"}><Text style={{ color: 'white' }}>{text}</Text></TouchableOpacity>
        </View>)

    }
    return (renderSwitch(thisAdvertRequestStatus))
}