import { View, Text, ScrollView, Button, TextInput, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import UserDataService from "../../HTTP/API/UserDataService"
import { Image } from 'react-native'
import useFetching from "../../Hooks/useFetching"
import MeStyles from "./MeStyles"
import API_URL from "../../Constants/uri"
import MyCalendar from "../../Components/Calendar/MyCalendar"
import Loader from "../../Components/Loader/Loader"
import useAuth from "../../Hooks/useAuth"
import { observer } from "mobx-react-lite"
import shallowEqual from "./helper"

export default observer(function Me() {
    const auth = useAuth()

    const [profile, setProfile] = useState({})
    const [editedProfile, setEditedProfile] = useState({})
    const [showData, setShowData] = useState(auth.isEditing ? editedProfile : profile)
    const [inputStyles, setStyles] = useState(auth.isEditing ? MeStyles.valueRedo : MeStyles.value);

    const [fetchUserData, loading, error] = useFetching(async () => {
        const userResponse = await UserDataService.getUserProfile()
        setProfile(userResponse)
        setEditedProfile(userResponse)
        setShowData(userResponse)
    })

    const [updateUserData, loading2, error2] = useFetching(async () => {
        editedProfile.locationLat = String(editedProfile?.locationLat)?.replace('.', ',')
        editedProfile.locationLng = String(editedProfile?.locationLat)?.replace('.', ',')
        console.log(editedProfile);
        try {
            await UserDataService.redoUserProfile(editedProfile)
            setShowData(editedProfile)
            setProfile(editedProfile)
        } catch (e) {
            setEditedProfile(profile)
            console.log(e.response.data);
        }
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

    useEffect(() => {
        setStyles(auth.isEditing ? MeStyles.valueRedo : MeStyles.value);
        setShowData(auth.isEditing ? editedProfile : profile)
        if ((!auth.isEditing) && !shallowEqual(editedProfile, profile) && Object.keys(profile).length != 0) {
            updateUserData()
        }
    }, [auth.isEditing]);

    const handleChange = (field, value) => {
        setEditedProfile({ ...editedProfile, [field]: value });
        setShowData({ ...showData, [field]: value });
    };

    if (loading || loading2) return <Loader />

    return (
        <ScrollView style={MeStyles.container}>

            <View style={MeStyles.header}>
                <Image source={{
                    uri:
                        API_URL +
                        showData.photoFilePath
                }} style={MeStyles.photo} />
                <View style={MeStyles.name}>
                    <TextInput
                        style={[inputStyles, { fontWeight: 'bold', fontSize: 20 }]}
                        value={showData.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />
                    <TextInput
                        style={[inputStyles, { fontWeight: 'bold', fontSize: 20 }]}
                        value={showData.surname}
                        onChangeText={(text) => handleChange('surname', text)}
                    />
                </View>
            </View>

            <View style={MeStyles.infoContainer}>

                <View style={MeStyles.leftSide}>

                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>✉️</Text>
                        <TextInput
                            style={inputStyles}
                            value={showData.email}
                            onChangeText={(text) => handleChange('email', text)}
                        />
                    </View>

                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>📍</Text>
                        <TextInput
                            style={inputStyles}
                            value={showData.location}
                            onChangeText={(text) => handleChange('location', text)}
                        />
                    </View>
                </View>

                <View style={MeStyles.rightSide}>
                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>📞</Text>
                        <TextInput
                            style={inputStyles}
                            value={showData.phoneNumber}
                            onChangeText={(text) => handleChange('phoneNumber', text)}
                        />
                    </View>
                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>{showData.sex == 'male' ? '👨' : '👩'}</Text>
                        <Text style={MeStyles.value}>{showData.sex == 'male' ? 'чоловік' : 'жінка'}</Text>
                    </View>
                </View>

            </View>
            <View style={MeStyles.calendarContainer}>
                <View style={MeStyles.calendarText}><Text style={MeStyles.label}>Графік  зайнятості</Text></View>
                <MyCalendar></MyCalendar>
            </View>
        </ScrollView>
    );
})