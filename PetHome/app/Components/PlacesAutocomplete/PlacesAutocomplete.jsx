import { ScrollView } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PlacesAutocompleteStyles } from './PlacesAutocompleteStyles';

export default function PlacesAutocomplete({ autoCompleteHandler }) {
    return (
        <ScrollView style={{ zIndex: 2, width: '100%' }} keyboardShouldPersistTaps={'handled'}>
            <GooglePlacesAutocomplete
                listViewDisplayed="auto"
                disableScroll={true}
                placeholder="Уведіть адресу"
                fetchDetails={true}
                minLength={2}
                onPress={() => console.log('here')}
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