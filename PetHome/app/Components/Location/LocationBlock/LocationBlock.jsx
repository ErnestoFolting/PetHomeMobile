import { Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import Loader from '../../Loader/Loader';
import PlacesAutocomplete from '../PlacesAutocomplete/PlacesAutocomplete';
import MyButton from '../../Common/MyButton';
import { replaceSigns } from '../../../Helpers/StringsHelper';

export default function LocationBlock({ data, setData, inRedo, changeLocation, setIsLocationChanging }) {

    const [deniedAccess, setDeniedAccess] = useState(false)
    const [isLocationLoading, setIsLocationLoading] = useState(false)

    useEffect(() => {
        async function checkLocation() {
            await checkLocationPermission()
        }
        checkLocation()
    }, [])

    const checkLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setDeniedAccess(true)
        }
    }

    const getUserLocation = async () => {
        try {
            setIsLocationLoading(true)
            // let locationResult = await Location.getCurrentPositionAsync({});
            // let { latitude, longitude } = locationResult.coords;
            let latitude = 50.0802105243495
            let longitude = 29.925069074247297
            const geocodeResponse = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });
            if (geocodeResponse.length > 0) {
                const { street, city, region } = geocodeResponse[0];
                const location = ((street !== null ? `${street}, ` : ``) + (city !== null ? `${city}, ` : ``) + (region !== null ? `${region}` : ``))
                console.log(location);
                setData({ ...data, location: location, locationLat: replaceSigns(latitude), locationLng: replaceSigns(longitude) })
                if (changeLocation) { changeLocation(location, replaceSigns(latitude), replaceSigns(longitude)) }
            }
        } catch (e) {
            Alert.alert(e);
        } finally {
            setIsLocationLoading(false)
            setIsLocationChanging(false)
        }
    }

    if (isLocationLoading) return <Loader />

    return (
        deniedAccess
            ? <PlacesAutocomplete formData={data} changeLocation={changeLocation} setFormData={setData} setIsLocationChanging={setIsLocationChanging} />
            : <MyButton isRound onPress={getUserLocation}>Моя локація</MyButton>
    )
}