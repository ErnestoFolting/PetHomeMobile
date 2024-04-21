import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MyRequestBlockStyles from './MyRequestBlockStyles';
import RequestService from '../../HTTP/API/RequestService';
import useFetching from '../../Hooks/useFetching';
import Loader from '../Loader/Loader';

export default function MyRequestBlock({ status, advertStatus, requestId, setNeedUpdate, needUpdate }) {

    const [deleteRequest, loading, error] = useFetching(async () => {
        await RequestService.deleteRequest(requestId)
    });
    const [acceptRequest, loading2, error2] = useFetching(async () => {
        await RequestService.acceptGeneratedRequest(requestId)
    });
    const deleteRequestHandler = async () => {
        try {
            await deleteRequest()
            setNeedUpdate(!needUpdate)
        } catch (e) {
            console.log(error)
        }
    }

    const acceptRequestHandler = async () => {
        try {
            await acceptRequest()
            setNeedUpdate(!needUpdate)
        } catch (e) {
            console.log(error2)
        }
    }

    function renderSwitch(status) {
        switch (status) {
            case 'rejected':
                return <View style={{ width: '100%' }}>
                    <Text style={MyRequestBlockStyles.text}>На жаль, замовник відмовив Вам</Text>
                    <TouchableOpacity onPress={deleteRequestHandler}
                        style={[MyRequestBlockStyles.declineButton, MyRequestBlockStyles.shadow]}>
                        <Text style={{ color: 'white' }}>Видалити заявку</Text>
                    </TouchableOpacity>
                </View>
            case 'generated':
                return <View style={{ width: '100%' }}>
                    <Text style={MyRequestBlockStyles.text}>Пропозиція згенерована системою</Text>
                    <View >
                        <TouchableOpacity
                            style={[MyRequestBlockStyles.acceptButton, MyRequestBlockStyles.shadow]}
                            onPress={acceptRequestHandler}>
                            <Text style={{ color: 'white' }}>Підтвердити</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[MyRequestBlockStyles.declineButton, MyRequestBlockStyles.shadow]}
                            onPress={deleteRequestHandler}>
                            <Text style={{ color: 'white' }}>Відхилити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            case 'applied':
                return <View style={{ width: '100%' }}>
                    <Text style={MyRequestBlockStyles.text}>Очікуємо на рішення замовника</Text>
                    <TouchableOpacity onPress={deleteRequestHandler}
                        style={[MyRequestBlockStyles.declineButton, MyRequestBlockStyles.shadow]}>
                        <Text style={{ color: 'white' }}>Відмінити заявку</Text>
                    </TouchableOpacity>
                </View>
            case 'confirmed':
                if (advertStatus === 'finished') return <View style={{ width: '100%' }}>
                    <Text style={MyRequestBlockStyles.text}>Ви виконали це замовлення</Text>
                    <TouchableOpacity
                        onPress={deleteRequestHandler}
                        style={[MyRequestBlockStyles.declineButton, MyRequestBlockStyles.shadow]}>
                        <Text style={{ color: 'white' }}>Видалити</Text>
                    </TouchableOpacity>
                </View>
                return <Text style={MyRequestBlockStyles.text}>Ви виконуєте це замовлення</Text>
            default:
                return <Text style={MyRequestBlockStyles.text}>Очікуємо</Text>
        }
    }

    if (loading || loading2) return <Loader />
    return (
        <View style={MyRequestBlockStyles.container}>
            {renderSwitch(status)}
        </View>
    )
}