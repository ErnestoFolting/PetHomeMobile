import { View, Text, Image } from 'react-native'
import React from 'react'
import UserNotificationStyles from './UserNotificationStyles';
import MyButton from '../Common/MyButton';
import Colors from '../../Constants/Colors';

export default function UserNotification({ request, status, navigationRef, ...props }) {
    const advertPhotoPath = `${process.env.EXPO_PUBLIC_API_URL}${request?.user?.photoFilePath}`;

    function toRequests() {
        navigationRef.current?.navigate('Деталі мого оголошення', { adId: request?.advertId });
    }

    function renderSwitch(status) {
        switch (status) {
            case 'delete':
                return request?.status === 'generated' ? <Text>відмовився від згенерованої заявки</Text> : <Text>відмінив заявку</Text>;
            case 'apply':
                return <Text>подав заявку</Text>;
            default:
                return <Text>Очікуємо</Text>;
        }
    }

    return (
        <View style={UserNotificationStyles.notificationBlock}>
            <View style={UserNotificationStyles.imgSection}>
                <Image
                    source={{ uri: advertPhotoPath }}
                    alt="user image"
                    style={UserNotificationStyles.img} />
            </View>
            <View style={UserNotificationStyles.infoSection}>
                <Text style={{ color: Colors.white }}>
                    Користувач {request?.user?.surname} {request?.user?.name}{' '}
                    {status && renderSwitch(status)}
                </Text>
            </View>
            <MyButton onPress={toRequests}>Переглянути заявки.</MyButton>
        </View>
    );
}