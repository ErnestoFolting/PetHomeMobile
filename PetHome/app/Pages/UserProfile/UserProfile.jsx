import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import useFetching from '../../Hooks/useFetching'
import Loader from '../../Components/Loader/Loader'
import UserService from '../../HTTP/API/UserService'
import UserProfileStyles from './UserProfileStyles'
import API_URL from '../../Constants/uri'
import UkrCalendar from '../../Components/Calendar/UkrCalendar'
import Colors from '../../Constants/Colors'

export default function UserProfile({ route }) {
    const { userID } = route.params
    const [profile, setProfile] = useState({})
    const [dates, setDates] = useState({})

    const [fetchProfileData, loading, error] = useFetching(async () => {
        const response = await UserService.getCertainUser(userID)
        setProfile(response)
    })

    useEffect(() => {
        const fetch = async () => {
            await fetchProfileData()

        }
        fetch()
    }, [userID])

    useEffect(() => {
        if (profile?.timeExceptions) {
            const markedDates = {};
            profile.timeExceptions.forEach((exception) => {
                markedDates[exception.date.split('T')[0]] = { selected: true, selectedColor: Colors.red };
            });
            setDates(markedDates)
        }

    }, [profile?.timeExceptions])

    if (loading) return <Loader />

    return (
        <ScrollView style={UserProfileStyles.container}>
            <View style={UserProfileStyles.header}>

                <Image source={{
                    uri:
                        API_URL +
                        profile.photoFilePath
                }} style={UserProfileStyles.photo} />

                <View style={UserProfileStyles.name}>
                    <Text style={[UserProfileStyles.value, { fontWeight: 'bold', fontSize: 20 }]}>{profile.name}</Text>

                    <Text style={[UserProfileStyles.value, { fontWeight: 'bold', fontSize: 20 }]}>{profile.surname}</Text>
                </View>
            </View>
            <View style={UserProfileStyles.infoContainer}>

                <View style={UserProfileStyles.leftSide}>

                    <View style={UserProfileStyles.infoRow}>
                        <Text style={UserProfileStyles.label}>✉️</Text>
                        <Text style={UserProfileStyles.value}>{profile.email}</Text>
                    </View>

                    <View style={UserProfileStyles.infoRow}>
                        <Text style={UserProfileStyles.label}>📍</Text>
                        <Text style={UserProfileStyles.value}>{profile.location}</Text>
                    </View>
                </View>

                <View style={UserProfileStyles.rightSide}>
                    <View style={UserProfileStyles.infoRow}>
                        <Text style={UserProfileStyles.label}>📞</Text>
                        <Text style={UserProfileStyles.value}>{profile.phoneNumber}</Text>
                    </View>
                    <View style={UserProfileStyles.infoRow}>
                        <Text style={UserProfileStyles.label}>{profile.sex == 'male' ? '👨' : '👩'}</Text>
                        <Text style={UserProfileStyles.value}>{profile.sex == 'male' ? 'чоловік' : 'жінка'}</Text>
                    </View>
                </View>

            </View>
            <View>
                <Text style={UserProfileStyles.calendarTitle}>Графік завантаженості</Text>
                <UkrCalendar markedDates={dates} />
            </View>
        </ScrollView>
    )
}