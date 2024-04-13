import { StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors';

const MyCalendarStyles = StyleSheet.create({
    buttons: {
        backgroundColor: Colors.light,
        borderRadius: 5
    },
    buttonSave: {
        backgroundColor: Colors.green,
        borderRadius: 5
    },
    calendar: {
        marginTop: 20,

    }
});

export default MyCalendarStyles;