import { StyleSheet } from 'react-native'
import Colors from '../../../Constants/Colors';

const PerformersSelectionBlockStyles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: Colors.greyLight,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: '100%',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    }, title: {
        fontSize: 20,
        alignSelf: 'center',
    }, markFinishedButton: {
        backgroundColor: Colors.green,
        alignItems: 'center',
        paddingVertical: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    }, deleteButton: {
        backgroundColor: Colors.red,
        alignItems: 'center',
        paddingVertical: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
    text: { textAlign: 'center', marginVertical: 10 }
});

export default PerformersSelectionBlockStyles;