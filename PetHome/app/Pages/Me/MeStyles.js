import { StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors';

const MeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        flex: 1,
        flexDirection: 'row'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.light,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    value: {
        marginLeft: 3,
    },
    valueRedo: {
        borderBottomWidth: 2,
        borderRadius: 3,
        borderColor: Colors.light,
        marginLeft: 3,
    },
    leftSide: {
        flex: 1,
        justifyContent: 'center'
    },
    rightSide: {
        flex: 1,
        justifyContent: 'center'
    },
    calendarContainer: {
    },
    calendarText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    error: {
        borderColor: 'red',
    },
    errorText: {

    },
    showErrorsButton: {
        backgroundColor: Colors.red,
        padding: 10,
        borderRadius: 5,
        marginBottom: 5
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    }
});

export default MeStyles;