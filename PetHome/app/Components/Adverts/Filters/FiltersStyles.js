import { StyleSheet } from 'react-native'
import Colors from '../../../Constants/Colors';

const FiltersStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.greyLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginBottom: 15
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5
    },
    input: {
        backgroundColor: Colors.white,
        height: 30,
        borderBottomWidth: 1,
        borderColor: Colors.greyLight,
        borderRadius: 10,
        marginBottom: 20,
        textAlign: 'center',
        minWidth: 70,
    },
    apply: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginTop: 10,
        borderRadius: 5,
        padding: 3,
        width: '100%'
    },
    costSelectionContainer: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    showFiltersButton: {
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center'
    },
    label: {
        margin: 5
    }
});

export default FiltersStyles;