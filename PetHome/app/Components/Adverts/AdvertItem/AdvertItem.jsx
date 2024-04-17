import { View, Text, Image, TouchableOpacity } from 'react-native'
import API_URL from '../../../Constants/uri'
import React from 'react'
import AdvertItemStyles from './AdvertItemStyles'
import Colors from '../../../Constants/Colors'

export default function AdvertItem({ item, navigation }) {

    const description = item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description.slice(0, 50)

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Деталі', { adId: item.id })}>
            <View style={AdvertItemStyles.container}>
                <View style={AdvertItemStyles.topBlock}><Image
                    source={{
                        uri:
                            API_URL +
                            item.photoFilePath
                    }}
                    style={AdvertItemStyles.img}
                />
                    <Text style={AdvertItemStyles.name}>{item.name}</Text>
                    <Text style={AdvertItemStyles.description}>{description}</Text></View>

                <View style={AdvertItemStyles.bottomBlock}>
                    <Text>📍{item.location}</Text>
                    <Text style={{ fontWeight: 'bold', color: Colors.green }}>{item.cost}₴</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}