import { StyleSheet } from 'react-native'
import Colors from '../../../Constants/Colors';

const AdvertRequestBlockStyles = StyleSheet.create({
    applyButton: {
        alignItems: 'center'
    },
    container: {
        width: '100%',
        backgroundColor: Colors.green,
        padding: 10,
        color: 'white'
    }, shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5
    }
});

export default AdvertRequestBlockStyles;