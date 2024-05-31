import { StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors'

const ModalStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
    },
    closeButton: {
        backgroundColor: Colors.light,
        padding: 10,
        marginBottom: 50,
        alignItems: 'center',
        borderRadius: 5,
    }, content: {
        marginBottom: 20,
        paddingBottom: 100
    }
})

export default ModalStyles