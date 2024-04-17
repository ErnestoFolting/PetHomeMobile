import { StyleSheet } from 'react-native'
import Colors from '../../../Constants/Colors';

const AdvertItemStyles = StyleSheet.create({
    toAdvertButton: {
        backgroundColor: Colors.light,
        padding: 10,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        alignItems: 'center',
        marginTop: 5,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
    },
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
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5,
        borderRadius: 5,
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
    }
});

export default AdvertItemStyles;