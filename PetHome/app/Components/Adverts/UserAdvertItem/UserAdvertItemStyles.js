import { StyleSheet } from 'react-native'
import Colors from '../../../Constants/Colors';

const UserAdvertItemStyles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginVertical: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: Colors.white
    },
    status: {
        alignSelf: 'center',
        marginBottom: 10,
        width: '100%',
        textAlign: 'center',
        padding: 10,
    }, requestsCount: {
        backgroundColor: Colors.greyLight,
    }, requestsCountEmpty: {
        backgroundColor: Colors.greyLight,
    }, finishedStatusItem: {
        backgroundColor: Colors.red
    }, confirmedStatus: {
        backgroundColor: Colors.green
    }
});

export default UserAdvertItemStyles;