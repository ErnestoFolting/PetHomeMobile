import { StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors';
const AdvertDetailStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 15
    },
    image: {
        width: '100%',
        height: 190,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    leftSide: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: Colors.greyLight,

    },
    rightSide: {

    },
    sides: {
        flexDirection: 'row',
        marginHorizontal: 20,
        width: '100%',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    location: {

        fontWeight: 'bold'
    },
    description: {
        flex: 1
    },
    cost: {
        color: Colors.green,
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    }
});

export default AdvertDetailStyles;