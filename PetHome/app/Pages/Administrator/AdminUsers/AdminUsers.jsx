import { ScrollView, Text, View, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import useFetching from '../../../Hooks/useFetching'
import AdminService from '../../../HTTP/API/AdminService'
import ProfileItem from '../../../Components/Profile/ProfileItem'
import Loader from '../../../Components/Loader/Loader'
import MyModal from '../../../Components/MyModal/MyModal'
import useStore from '../../../Hooks/useAuth'
import { observer } from 'mobx-react-lite'
import MyButton from '../../../Components/Common/MyButton'
import Colors from '../../../Constants/Colors'
import AdminUsersStyles from './AdminUsersStyles'

export default observer(function AdminUsers({ navigation }) {
    const store = useStore()
    const [users, setUsers] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isAdminModalVisible, setIsAdminModalVisible] = useState(false)
    const [addAdminData, setAddAdminData] = useState({ username: "check", password: 'Password123!' })
    const [fetchUsers, loading, error] = useFetching(async () => {
        const userResponse = await AdminService.getAllUsers()
        setUsers(userResponse)
    })
    const [addAdmin, loading2, error2] = useFetching(async () => {
        await AdminService.addAdmin(addAdminData)
    })

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchUsers()
            } catch (e) {
                setIsModalVisible(true)
            }
        }
        fetchData()
    }, [store?.usersNeedUpdate])

    const addAdminHandler = async () => {
        try {
            setIsAdminModalVisible(false)
            await addAdmin()
            alert('Створено')
        } catch (e) {
            console.log(e);
            setIsModalVisible(true)
        }
    }

    const addAdminForm = <View style={{ marginBottom: 220 }}>
        <Text style={{ textAlign: 'center', margin: 30, fontWeight: 'bold' }}>Уведіть дані</Text>
        <TextInput
            placeholder="Логін*"
            value={addAdminData.username}
            onChangeText={text => setAddAdminData({ ...addAdminData, username: text })}
            style={AdminUsersStyles.input}
        />

        <TextInput
            placeholder="Пароль*"
            value={addAdminData.password}
            onChangeText={text => setAddAdminData({ ...addAdminData, password: text })}
            style={AdminUsersStyles.input}
        />
        <MyButton style={{ backgroundColor: Colors.green }} onPress={addAdminHandler}>Додати</MyButton></View>



    if (loading || loading2) return <Loader />
    return (
        <ScrollView>
            <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} content={<Text>{error}{error2}</Text>}></MyModal>

            <MyModal isModalVisible={isAdminModalVisible} setIsModalVisible={setIsAdminModalVisible} content={addAdminForm}></MyModal>
            <MyButton style={{ backgroundColor: Colors.light }} onPress={() => setIsAdminModalVisible(true)}>Додати адміністратора</MyButton>
            {users.map((el) =>
                <ProfileItem
                    key={el?.id}
                    requestData={el}
                    navigation={navigation}
                    profileData={el}
                    isBig
                    borderRadiusTop
                    id={el?.id}
                />
            )}
        </ScrollView>
    )
}) 