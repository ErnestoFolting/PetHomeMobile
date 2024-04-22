import { StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors';

const ProfileItemStyles = StyleSheet.create({
    ownerImage: {
        height: 100,
        borderRadius: 50,
        width: 100,
    }, ownerBlock: {
        backgroundColor: Colors.greyLight,
    },
    smallWidthStyles: {
        paddingLeft: 20
    },
    borderRadiusTop: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    fullWidthStyles: {
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    ownerTitle: {
        fontSize: 20,
        alignSelf: 'center',
    },
    ownerContent: {
        marginTop: 10,
        justifyContent: 'space-around',
    },
    ownerInfo: {
        justifyContent: 'center',
        marginVertical: 10
    },
    ownerName: {
        fontWeight: 'bold',
    },
    ownerPhoneNumber: {

    },
});

export default ProfileItemStyles;