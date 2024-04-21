import { StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors'

const MyRequestBlockStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.greyLight,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    declineButton: {
        backgroundColor: Colors.red,
        padding: 10,
        borderRadius: 5,
    }, shadow: {
        margin: 10, shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    }, text: {
        marginHorizontal: 10,
    }, acceptButton: {
        backgroundColor: Colors.green,
        padding: 10,
        borderRadius: 5,
    }
})

export default MyRequestBlockStyles