import Colors from "../../Constants/Colors";

export const RegistrationStyles = {
    input: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: '100%',
    },
    errorInput: {
        borderColor: Colors.red
    },
    button: {
        backgroundColor: Colors.light,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    label: {
        marginBottom: 5,
    },
    form: {
        marginTop: '10%',
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }, radioText: {
        marginRight: 10,
        fontSize: 16,
    },
    radioChecked: {
        fontWeight: 'bold',
        color: Colors.light,
    },
    imageInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
};