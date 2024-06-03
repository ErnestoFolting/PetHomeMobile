import { ScrollView } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PlacesAutocompleteStyles } from './PlacesAutocompleteStyles';
import { replaceSigns } from '../../../Helpers/StringsHelper';

export default function PlacesAutocomplete({ formData, setFormData, changeLocation, setIsLocationChanging }) {

    const autoCompleteHandler = (data, details = null) => {
        let latitude = details.geometry.location.lat
        let longitude = details.geometry.location.lng
        let addressComponents = details.address_components;
        let city = '';
        let region = '';
        let route = '';
        for (const element of addressComponents) {
            if (element.types.includes('route')) {
                route = element.long_name;
            }
            if (element.types.includes('locality')) {
                city = element.long_name;
            }
            if (element.types.includes('administrative_area_level_1')) {
                region = element.long_name;
            }
        }
        const location = ((route !== '' ? `${route}, ` : ``) + (city !== '' ? `${city}, ` : ``) + (region !== '' ? `${region}` : ``))

        setFormData({ ...formData, location: location, locationLat: replaceSigns(latitude), locationLng: replaceSigns(longitude) })
        if (changeLocation) { changeLocation(location, replaceSigns(latitude), replaceSigns(longitude)) }

        setIsLocationChanging(false)
    }

    return (
        <ScrollView style={{ zIndex: 2, width: '100%' }} keyboardShouldPersistTaps={'handled'}>
            <GooglePlacesAutocomplete
                listViewDisplayed="auto"
                disableScroll={true}
                placeholder="📍Уведіть місцеположення"
                fetchDetails={true}
                minLength={2}
                onPress={autoCompleteHandler}
                query={{
                    key: 'AIzaSyBAZ6PeDUYRpvEklqcxAJjAzfCKjtazNZs',
                    language: 'uk',
                    components: 'country:ua',
                }}
                onFail={e => console.log(e)}
                styles={PlacesAutocompleteStyles}
            />
        </ScrollView>
    )
}