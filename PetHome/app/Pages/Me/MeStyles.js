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
        fontSize: 20,
        fontWeight: 'bold',
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
    value: {},
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
    }
});

export default MeStyles;