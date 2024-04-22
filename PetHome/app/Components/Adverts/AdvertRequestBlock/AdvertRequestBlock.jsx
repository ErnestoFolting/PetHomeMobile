import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useFetching from '../../../Hooks/useFetching'
import AdvertRequestBlockStyles from './AdvertRequestBlockStyles'
import UserDataService from '../../../HTTP/API/UserDataService'
import RequestService from '../../../HTTP/API/RequestService'
import Loader from '../../Loader/Loader'
import useAuth from '../../../Hooks/useAuth'

export default function AdvertRequestBlock({ advertStatus, setIsModalVisible, advertId, setAdvertRequestErrors }) {
    const auth = useAuth();

    const [userRequests, setUserRequests] = useState([])
    const [checkIfRequestSent, loading, error] = useFetching(async () => {
        setUserRequests(await UserDataService.getUserRequests())
    });
    const [applyRequest, loading2, error2] = useFetching(async () => {
        await RequestService.sendRequest(advertId)
    })

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
    }, [loading2])

    useEffect(() => {
        if (error || error2) {
            error2 && setAdvertRequestErrors(error2);
            error && setAdvertRequestErrors(error);
            setIsModalVisible(true)
        }
    }, [loading2, loading])

    const thisAdvertRequestStatus = userRequests?.find(el => el?.advertId === advertId)?.status;

    const applyRequestHandler = async () => {
        try {
            await applyRequest()
        } catch (e) { console.log(e); }
    }

    if (loading || loading2) return <Loader />

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
                if (advertStatus === 'finished') text = "Ви виконали це замовлення"
                text = "Ви виконуєте це замовлення"
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