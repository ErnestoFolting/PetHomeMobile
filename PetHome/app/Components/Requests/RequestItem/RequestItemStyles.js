import { StyleSheet } from 'react-native'
import Colors from '../../../Constants/Colors'

const RequestItemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        marginVertical: 10,
    },
    profileBlock: {
        flex: 1,
    },
    buttonBlock: {
        paddingVertical: 40,
        justifyContent: 'space-around',
        flex: 1,
        alignItems: 'center'
    },
    confirmButton: {
        padding: 10,
        backgroundColor: Colors.green,
        borderRadius: 5,
        width: '80%'
    },
    rejectButton: {
        padding: 10,
        backgroundColor: Colors.red,
        borderRadius: 5,
        width: '80%',
    }
})

export default RequestItemStyles