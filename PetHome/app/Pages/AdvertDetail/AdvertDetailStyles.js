import { StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors';
const AdvertDeatilStyles = StyleSheet.create({
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
    ownerImage: {
        height: 100,
        borderRadius: 50,
        width: 100,

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
    ownerBlock: {
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
    },
    ownerTitle: {
        fontSize: 20,
        alignSelf: 'center',
    },
    ownerContent: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    ownerInfo: {
        justifyContent: 'center',
    },
    ownerName: {
        fontWeight: 'bold',
    },
    ownerPhoneNumber: {

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

export default AdvertDeatilStyles;