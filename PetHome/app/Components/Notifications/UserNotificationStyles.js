import { StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors';

const UserNotificationStyles = StyleSheet.create({
    notificationBlock: {
        backgroundColor: Colors.black
    },
    imgSection: {
        marginBottom: 10,
        alignItems: 'center',
    },
    infoSection: {
        textAlign: 'center',
        padding: 10,
    },
    img: {
        height: 100,
        borderRadius: 50,
        width: 100,
    }
});

export default UserNotificationStyles;