import { StyleSheet } from 'react-native'

const AdvertNotificationStyles = StyleSheet.create({
    notificationBlock: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderRadius: 20,
        paddingTop: 10,
        width: '80%',
    },
    imgSection: {
        alignItems: 'center',
    },
    infoSection: {
        textAlign: 'center',
        flex: 0.8,
        justifyContent: 'center',
    },
    img: {
        height: 80,
        borderRadius: 40,
        width: 80,
    },
    contentSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingBottom: 10
    }
});

export default AdvertNotificationStyles;