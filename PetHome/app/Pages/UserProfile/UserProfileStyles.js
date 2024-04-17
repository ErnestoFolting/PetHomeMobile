import { StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors';

const UserProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30,
    }, header: {
        alignItems: 'center',
        marginBottom: 20,
    }, photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        flex: 1,
        flexDirection: 'row'
    }, infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.light,
    }, leftSide: {
        flex: 1,
        justifyContent: 'center'
    }, infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
    }, label: {
        fontWeight: 'bold',
        marginRight: 5,
    }, rightSide: {
        flex: 1,
        justifyContent: 'center'
    }, value: {
        marginLeft: 3,
    }, calendarTitle: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20
    }
});

export default UserProfileStyles;