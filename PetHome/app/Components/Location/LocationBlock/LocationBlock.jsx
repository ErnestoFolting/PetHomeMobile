import { Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import Loader from '../../Loader/Loader';
import PlacesAutocomplete from '../PlacesAutocomplete/PlacesAutocomplete';
import MyButton from '../../Common/MyButton';

export default function LocationBlock({ data, setData }) {

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
                setData({ ...data, location: location, locationLat: String(latitude)?.replace('.', ','), locationLng: String(longitude)?.replace('.', ',') })
            }
        } catch (e) {
            Alert.alert(e);
        } finally {
            setIsLocationLoading(false)
        }
    }

    if (isLocationLoading) return <Loader />

    return (
        deniedAccess
            ? <PlacesAutocomplete formData={data} setFormData={setData} />
            : data?.location == "Fastiv"
                ? <MyButton isRound onPress={getUserLocation}>Моя локація</MyButton>
                : <Text>📍{data?.location}</Text>
    )
}