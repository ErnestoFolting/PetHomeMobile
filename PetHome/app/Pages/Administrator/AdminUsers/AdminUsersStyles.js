import { StyleSheet } from 'react-native'
import Colors from '../../../Constants/Colors';

const AdminUsersStyles = StyleSheet.create({
    input: {
        backgroundColor: Colors.white,
        height: 30,
        borderBottomWidth: 1,
        borderColor: Colors.greyLight,
        borderRadius: 10,
        marginBottom: 20,
        textAlign: 'center',
        minWidth: 70,
    }
});

export default AdminUsersStyles;