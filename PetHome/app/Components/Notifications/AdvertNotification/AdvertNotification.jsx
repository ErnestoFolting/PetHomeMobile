import { View, Text, Image } from 'react-native'
import React from 'react'
import MyButton from '../../Common/MyButton'
import AdvertNotificationStyles from './AdvertNotificationStyles'
import Colors from '../../../Constants/Colors'

export default function AdvertNotification({ advert, status, navigationRef, hide, ...props }) {

    const advertPhotoFilePath = `${process.env.EXPO_PUBLIC_API_URL}${advert?.photoFilePath}`;

    function toRequests() {
        navigationRef.current?.navigate('Деталі мого запиту', { adId: advert?.id });
        hide()
    }

    function renderSwitch(status) {
        let text = ''
        switch (status) {
            case 'generated':
                text = 'Ми підібрали для Вас оголошення, погляньте.'
                break
            case 'confirm':
                text = 'Власник підтвердив Вашу заявку.'
                break
            case 'reject':
                text = 'Власник відхилив Вашу заявку.'
                break
            default:
                text = 'Очікуємо'
        }
        return <Text style={{ color: 'white' }}>{text}</Text>
    }

    return (
        <View style={AdvertNotificationStyles.notificationBlock}>
            <View style={AdvertNotificationStyles.contentSection}>
                <View className={AdvertNotificationStyles.imgSection}>
                    <Image
                        source={{ uri: advertPhotoFilePath }}
                        alt='advertPhoto'
                        style={AdvertNotificationStyles.img}
                    />
                </View>
                <View style={AdvertNotificationStyles.infoSection}>
                    {status && renderSwitch(status)}
                </View>
            </View>
            <MyButton style={{ backgroundColor: Colors.main, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} onPress={toRequests}>Переглянути заявки</MyButton>
        </View>
    )
}