import { StyleSheet } from "react-native";
import Colors from "../../Constants/Colors";

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
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
        borderColor: Colors.main,
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
    }
});

export default LoginStyles;