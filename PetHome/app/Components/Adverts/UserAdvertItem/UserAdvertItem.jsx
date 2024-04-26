import { View, Text } from 'react-native'
import React from 'react'
import UserAdvertItemStyles from './UserAdvertItemStyles'
import AdvertItem from '../AdvertItem/AdvertItem'

export default function UserAdvertItem({ ...props }) {
    const { item } = props;
    function renderSwitch(status) {
        const requestCount = item?.requests?.filter((el) => el.status === 'applied')?.length
        switch (status) {
            case 'search':
                return <Text style={[requestCount ? UserAdvertItemStyles.requestsCount : UserAdvertItemStyles.requestsCountEmpty, UserAdvertItemStyles.status]}>Відгукнулось: {requestCount}</Text>
            case 'process':
                return <Text style={[UserAdvertItemStyles.confirmedStatus, UserAdvertItemStyles.status]}>Виконавця знайдено</Text>
            case 'finished':
                return <Text style={[UserAdvertItemStyles.finishedStatusItem, UserAdvertItemStyles.status]}>Виконання завершено</Text>
            default:
                return <Text style={UserAdvertItemStyles.status}>Очікуємо</Text>
        }
    }

    return (<View style={UserAdvertItemStyles.container}>
        <AdvertItem {...props} isMy disableShadow />
        {renderSwitch(item.status)}
    </View>
    )
}