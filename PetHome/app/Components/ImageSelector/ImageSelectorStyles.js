import { StyleSheet } from 'react-native'

const ImageSelectorStyles = StyleSheet.create({
    boxInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
        width: '100%'
    },
    imageInputLabel: {
        marginBottom: 5,
        color: '#000',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 5,
    },
    imagePlaceholder: {
        textAlign: 'center',
        color: 'gray',
    },
});

export default ImageSelectorStyles;