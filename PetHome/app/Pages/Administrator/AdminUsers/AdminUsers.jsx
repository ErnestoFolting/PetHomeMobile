import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import useFetching from '../../../Hooks/useFetching'
import AdminService from '../../../HTTP/API/AdminService'

export default function AdminUsers() {
    const [users, setUsers] = useState([])
    const [fetchUsers, loading, error] = useFetching(async () => {
        const userResponse = await AdminService.getAllUsers()
        setUsers(userResponse)
    })

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchUsers()
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [])

    return (
        <View>
            <Text>{users.length}</Text>
        </View>
    )
}