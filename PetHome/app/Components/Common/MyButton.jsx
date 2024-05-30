import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyButtonStyles from './MyButtonStyles'
import Colors from '../../Constants/Colors'

export default function MyButton({ children, isRound, style, ...props }) {
    return (
        <TouchableOpacity  {...props} style={style}>
            <View style={[MyButtonStyles.container, isRound && MyButtonStyles.round, style]}>
                <Text style={{ color: Colors.white }}>{children}</Text>
            </View>
        </TouchableOpacity>
    )
}