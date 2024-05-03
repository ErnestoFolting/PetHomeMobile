import { StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors';

const CreateAdvertStyles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    imageInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
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
        color: 'gray',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    }, form: {
        marginTop: '10%',
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CreateAdvertStyles;