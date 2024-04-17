import { View, Text } from 'react-native'
import React from 'react'
import FiltersStyles from './FiltersStyles'

export default function Filters() {
    return (
        <View style={FiltersStyles.container}>
            <Text style={{ color: 'white' }}>Фільтри</Text>
        </View>
    )
}