import { StyleSheet } from 'react-native';

export const PlacesAutocompleteStyles = StyleSheet.create({
    container: {
        padding: 5
    },
    textInputContainer: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 14,
    },
    poweredContainer: {
        display: 'none',
    },
    listView: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 5,
    },
    row: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    description: {
        fontSize: 14,
    },
});
