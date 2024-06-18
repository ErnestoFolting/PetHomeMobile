import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native"
import React, { useEffect, useState } from "react"
import UserDataService from "../../HTTP/API/UserDataService"
import { Image } from 'react-native'
import useFetching from "../../Hooks/useFetching"
import MeStyles from "./MeStyles"
import API_URL from "../../Constants/uri"
import MyCalendar from "../../Components/Calendar/MyCalendar"
import Loader from "../../Components/Loader/Loader"
import useStore from "../../Hooks/useAuth"
import { observer } from "mobx-react-lite"
import shallowEqual from "./helper"
import validateProfileRedo from "./ProfileRedoValidation"
import { validateField } from "./ProfileRedoValidation"
import MyModal from "../../Components/MyModal/MyModal"
import MyButton from "../../Components/Common/MyButton"
import { replaceSigns } from "../../Helpers/StringsHelper"
import LocationBlock from "../../Components/Location/LocationBlock/LocationBlock"

export default observer(function Me() {
    const store = useStore()

    const [profile, setProfile] = useState({})
    const [editedProfile, setEditedProfile] = useState({})
    const [showData, setShowData] = useState(store.isEditing ? editedProfile : profile)
    const [inputStyles, setStyles] = useState(store.isEditing ? MeStyles.valueRedo : MeStyles.value);
    const [validationErrors, setValidationErrors] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [isLocationChanging, setIsLocationChanging] = useState(false)

    const [fetchUserData, loading, error] = useFetching(async () => {
        const userResponse = await UserDataService.getUserProfile()
        setProfile(userResponse)
        setEditedProfile(userResponse)
        setShowData(userResponse)
    })

    const [updateUserData, loading2, error2] = useFetching(async () => {
        editedProfile.locationLat = replaceSigns(editedProfile?.locationLat)
        editedProfile.locationLng = replaceSigns(editedProfile?.locationLng)
        try {
            await UserDataService.redoUserProfile(editedProfile)
            setShowData(editedProfile)
            setProfile(editedProfile)
        } catch (e) {
            setEditedProfile(profile)
            console.log(e.response.data);
        }
    })

    const [deleteProfile, loading3, error3] = useFetching(async () => {
        await UserDataService.deleteUserProfile()
    })


    useEffect(() => { //profile fetch
        async function fetchData() {
            try {
                await fetchUserData()
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [])

    useEffect(() => { //redo
        setStyles(store.isEditing ? MeStyles.valueRedo : MeStyles.value);
        setShowData(store.isEditing ? editedProfile : profile)

        if ((!store.isEditing) && !shallowEqual(editedProfile, profile) && Object.keys(profile).length != 0) {
            validateProfileRedo(editedProfile).then(async (result) => {
                if (result.isValid) {
                    updateUserData()
                } else {
                    console.log("Object is not valid. Errors:", result.errors);
                    store.setIsEditing(true)
                }
            });
        }
        setIsLocationChanging(false)
    }, [store.isEditing]);

    const handleChange = (field, value) => {
        setEditedProfile({ ...editedProfile, [field]: value });
        setShowData({ ...showData, [field]: value });
        setValidationErrors({ ...validationErrors, [field]: undefined });
    };

    const changeLocation = (location, locationLat, locationLng) => {
        setEditedProfile({ ...editedProfile, location: location, locationLat: locationLat, locationLng: locationLng });
        setShowData({ ...showData, location: location, locationLat: locationLat, locationLng: locationLng });
    }

    const handleBlur = (field, value) => {
        validateField(field, value, setValidationErrors, validationErrors);
    };

    const showErrors = () => {
        setIsModalVisible(true);
    }

    const handleDelete = async () => {
        try {
            await deleteProfile()
            store.setAuth(false)
        } catch (e) {
            console.log(e);
            setIsErrorModalVisible(true)
        }
    }

    if (loading || loading2 || loading3) return <Loader />

    const errorModal = isErrorModalVisible && <MyModal isModalVisible={isErrorModalVisible} setIsModalVisible={setIsErrorModalVisible} content={<Text>{error}{error2}{error3}</Text>}></MyModal>

    return (
        <ScrollView style={MeStyles.container} keyboardShouldPersistTaps={'handled'}>
            {errorModal}
            <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} content={Object.entries(validationErrors).map(([field, errorMessage], index) => (
                <Text key={index}>{errorMessage}</Text>
            ))}></MyModal>
            <View style={MeStyles.header}>

                <Image source={{
                    uri:
                        API_URL +
                        showData.photoFilePath
                }} style={MeStyles.photo} />

                <View style={MeStyles.name}>
                    <TextInput
                        style={[inputStyles, { fontWeight: 'bold', fontSize: 20 }, validationErrors.name && MeStyles.error]}
                        value={showData.name}
                        onChangeText={(text) => handleChange('name', text)}
                        onBlur={(e) => handleBlur('name', e.nativeEvent.text)}
                        autoComplete="name"
                        editable={store.isEditing}
                    />

                    <TextInput
                        style={[inputStyles, { fontWeight: 'bold', fontSize: 20 }, validationErrors.surname && MeStyles.error]}
                        value={showData.surname}
                        onChangeText={(text) => handleChange('surname', text)}
                        onBlur={(e) => handleBlur('surname', e.nativeEvent.text)}
                        autoComplete="family-name"
                        editable={store.isEditing}
                    />
                </View>
            </View>
            {Object.values(validationErrors).some((value) => value !== undefined) && <TouchableOpacity style={MeStyles.showErrorsButton} onPress={showErrors}><Text style={{ textAlign: 'center' }} >Показати помилки</Text></TouchableOpacity>}
            <View style={MeStyles.infoContainer}>

                <View style={MeStyles.leftSide}>

                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>✉️</Text>
                        <TextInput
                            style={[inputStyles, validationErrors.email && MeStyles.error]}
                            value={showData.email}
                            onChangeText={(text) => handleChange('email', text)}
                            onBlur={(e) => handleBlur('email', e.nativeEvent.text)}
                            autoComplete="email"
                            editable={store.isEditing}
                        />
                    </View>
                    {!isLocationChanging && showData?.location !== "Fastiv"  //location is set
                        ? <View>
                            <Text style={{ marginBottom: 10 }}>📍{showData?.location}</Text>
                            {store.isEditing && <MyButton onPress={() => setIsLocationChanging(true)} isRound>Змінити локацію</MyButton>}
                        </View>

                        : <LocationBlock data={editedProfile} setData={setEditedProfile} changeLocation={changeLocation} inRedo setIsLocationChanging={setIsLocationChanging} />
                    }

                </View>

                <View style={MeStyles.rightSide}>
                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>📞</Text>
                        <TextInput
                            style={[inputStyles, validationErrors.phoneNumber && MeStyles.error]}
                            value={showData.phoneNumber}
                            onChangeText={(text) => handleChange('phoneNumber', text)}
                            onBlur={(e) => handleBlur('phoneNumber', e.nativeEvent.text)}
                            autoComplete="tel"
                            editable={store.isEditing}
                        />
                    </View>
                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>{showData.sex == 'male' ? '👨' : '👩'}</Text>
                        <Text style={MeStyles.value}>{showData.sex == 'male' ? 'чоловік' : 'жінка'}</Text>
                    </View>
                </View>

            </View>
            <MyButton isRound onPress={handleDelete}>Видалити профіль</MyButton>
            <View style={MeStyles.calendarContainer}>
                <View style={MeStyles.calendarText}><Text style={MeStyles.label}>Графік  зайнятості</Text></View>
                <MyCalendar></MyCalendar>
            </View>
        </ScrollView>
    );
})