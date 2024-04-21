import { StyleSheet } from 'react-native'
import Colors from '../../../Constants/Colors';

const AdvertItemStyles = StyleSheet.create({
    img: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    container: {
        marginHorizontal: 5,
        marginVertical: 5,
        width: 190,
        height: 'auto',
        minHeight: 210,
        minWidth: 100,
        backgroundColor: Colors.white,
    },
    name: {
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 3,
        fontSize: 15
    }, bottomBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: 10,
        marginTop: 10,
    },
    description: {
        marginHorizontal: 5,
    },
    topBlock: {
        flex: 1,
    },
    shadow: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 5,
    }
});

export default AdvertItemStyles;