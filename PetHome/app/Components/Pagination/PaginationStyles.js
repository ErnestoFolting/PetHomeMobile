import { StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors';

const PaginationStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 130
    },
    currentpaginationEl: {
        backgroundColor: Colors.light,
        borderRadius: 5,
        padding: 10
    },
    paginationEl: {
        padding: 10
    },
    button: {
        color: Colors.white,
    },

    buttonCurrent: {
        marginTop: 15,
        color: Colors.white
    }

});

export default PaginationStyles;