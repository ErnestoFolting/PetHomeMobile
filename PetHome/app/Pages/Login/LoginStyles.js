import { StyleSheet } from "react-native";
import Colors from "../../Constants/Colors";

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        marginBottom: 80
    },
    label: {
        marginBottom: 5,
        alignSelf: 'flex-start',
        marginLeft: '15%'
    },
    input: {
        width: "75%",
        height: 40,
        borderWidth: 2,
        borderColor: Colors.light,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    logo: {
        marginBottom: 20,
    },
    form: {
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
    },
    authorization: {
        fontSize: 20,
        margin: 20,
        fontWeight: 'bold',
    },
    noacc: {
        fontWeight: 'normal'
    },
    registerContainer: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    registerLink: {
        marginLeft: 5,
        color: 'blue',
    },
    button: {
        backgroundColor: Colors.light,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default LoginStyles;