import { View, Text } from 'react-native'
import React, { useState } from 'react'
import FiltersStyles from './FiltersStyles'

export default function Filters({ isUserAdverts, queryParams, setQueryParams }) {

    return (
        <View style={FiltersStyles.container}>
            <Text style={{ color: 'white' }}>Фільтри{isUserAdverts && <Text> користувача</Text>}</Text>
        </View>
    )
}