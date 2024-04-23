import { View, Text, Image, TouchableOpacity } from 'react-native'
import API_URL from '../../../Constants/uri'
import React from 'react'
import AdvertItemStyles from './AdvertItemStyles'
import Colors from '../../../Constants/Colors'

export default function AdvertItem({ item, navigation, disableShadow, isMy, update, setUpdate }) {

    const description = item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description.slice(0, 50)
    const path = isMy ? 'Деталі мого оголошення' : 'Деталі'
    return (
        <TouchableOpacity onPress={() => navigation.navigate(path, { adId: item.id, update: update, setUpdate: setUpdate })}>
            <View style={[AdvertItemStyles.container, !disableShadow && AdvertItemStyles.shadow]}>
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