import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import useFetching from '../../../Hooks/useFetching'
import AdminService from '../../../HTTP/API/AdminService'

export default function AdminAdverts() {
    const [adverts, setAdverts] = useState([])
    const [fetchAdverts, loading, error] = useFetching(async () => {
        const advertResponse = await AdminService.getAllAdverts()
        setAdverts(advertResponse)
    })

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchAdverts()
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [])

    return (
        <View>
            <Text>{adverts.length}</Text>
        </View>
    )
}