import { StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors';

const MyButtonStyles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.red,
        padding: 10,
        alignItems: 'center'
    },
    round: {
        borderRadius: 10
    }
});

export default MyButtonStyles;