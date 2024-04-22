import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ProfileItemStyles from './ProfileItemStyles'
import API_URL from '../../Constants/uri'

export default function ProfileItem({ navigation, title, profileData, id, isBig, borderRadiusTop }) {
    return (
        <TouchableOpacity style={[ProfileItemStyles.ownerBlock, isBig && ProfileItemStyles.fullWidthStyles, !isBig && ProfileItemStyles.smallWidthStyles, borderRadiusTop && ProfileItemStyles.borderRadiusTop]} onPress={() => navigation.navigate('Профіль', { userID: id })}>
            <Text style={ProfileItemStyles.ownerTitle}>{title}</Text>
            <View style={[ProfileItemStyles.ownerContent, isBig && { flexDirection: 'row' }]}>
                <Image
                    source={{ uri: API_URL + profileData?.photoFilePath }}
                    alt="owner image"
                    style={ProfileItemStyles.ownerImage} />
                <View style={ProfileItemStyles.ownerInfo}>
                    <Text style={ProfileItemStyles.ownerName}>{profileData?.name}</Text>
                    <Text style={ProfileItemStyles.ownerPhoneNumber}>{profileData?.phoneNumber}</Text>
                </View>

            </View>

        </TouchableOpacity>
    )
}