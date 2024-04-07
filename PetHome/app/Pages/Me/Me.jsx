import { View, Text, ScrollView, Button } from "react-native"
import React, { useEffect, useState } from "react"
import UserDataService from "../../HTTP/API/UserDataService"
import { Image } from 'react-native'
import useFetching from "../../Hooks/useFetching"
import MeStyles from "./MeStyles"
import API_URL from "../../Constants/uri"
import MyCalendar from "../../Components/Calendar/MyCalendar"
import Loader from "../../Components/Loader/Loader"

export default function Me() {
    const [profile, setProfile] = useState({})
    const [fetchUserData, loading, error] = useFetching(async () => {
        const userResponse = await UserDataService.getUserProfile()
        setProfile(userResponse)
        console.log(userResponse);
    })

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchUserData()
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [])


    if (loading) return <Loader />

    return (
        <ScrollView style={MeStyles.container}>
            <View style={MeStyles.header}>
                <Image source={{
                    uri:
                        API_URL +
                        profile.photoFilePath
                }} style={MeStyles.photo} />
                <Text style={MeStyles.name}>{profile.name} {profile.surname}</Text>
            </View>
            <View style={MeStyles.infoContainer}>

                <View style={MeStyles.leftSide}>
                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>✉️</Text>
                        <Text style={MeStyles.value}>{profile.email}</Text>
                    </View>
                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>📍</Text>
                        <Text style={MeStyles.value}>{profile.location}</Text>
                    </View>
                </View>

                <View style={MeStyles.rightSide}>
                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>📞</Text>
                        <Text style={MeStyles.value}>{profile.phoneNumber}</Text>
                    </View>
                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>{profile.sex == 'male' ? '👨' : '👩'}</Text>
                        <Text style={MeStyles.value}>{profile.sex == 'male' ? 'чоловік' : 'жінка'}</Text>
                    </View>
                </View>

            </View>
            <View style={MeStyles.calendarContainer}>
                <View style={MeStyles.calendarText}><Text style={MeStyles.label}>Графік  зайнятості</Text></View>
                <MyCalendar></MyCalendar>
            </View>
        </ScrollView>
    );
}