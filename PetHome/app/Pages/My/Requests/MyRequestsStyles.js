import { StyleSheet } from 'react-native'
import Colors from '../../../Constants/Colors';

const MyRequestsStyles = StyleSheet.create({
    element: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 5,
        marginHorizontal: 10
    }
});

export default MyRequestsStyles;