import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import UkrCalendar from '../UkrCalendar'
import AdvertCreationCalendarStyles from './AdvertCreationCalendarStyles'
import Colors from '../../../Constants/Colors'
import { extractStartAndEndDates } from '../CalendarHelper'

export default function AdvertCreationCalendar({ setAdvertData, advertData, setIsModalVisible, ...props }) {

    const [datesState, setDatesState] = useState({
        markedDates: {},
        isStartDatePicked: false,
        isEndDatePicked: false,
        startDate: ''
    })

    const onDayPress = (day) => {
        if (!datesState?.isStartDatePicked) {
            const markedDates = {}
            markedDates[day.dateString] = { startingDay: true, color: Colors.light, textColor: '#FFFFFF' };
            setDatesState({
                markedDates: markedDates,
                isStartDatePicked: true,
                isEndDatePicked: false,
                startDate: day.dateString,
            });
        } else {
            const markedDates = datesState?.markedDates
            const startDate = datesState?.startDate
            const endDate = day.dateString;
            const difMs = new Date(endDate) - new Date(datesState.startDate)
            const difDays = Math.floor(difMs / (1000 * 60 * 60 * 24));
            const range = difDays
            const temp = new Date(startDate);
            if (range > 0) {
                for (let i = 1; i <= range; i++) {
                    temp.setDate(temp.getDate() + 1)
                    const day = temp.getDate()
                    const month = temp.getMonth() + 1
                    const tempDate = temp.getFullYear() + '-' + (month < 10 ? `0${month}` : month) + '-' + (day < 10 ? `0${day}` : day)
                    if (i < range) {
                        markedDates[tempDate] = { color: Colors.light, textColor: '#FFFFFF' };
                    } else {
                        markedDates[tempDate] = { endingDay: true, color: Colors.light, textColor: '#FFFFFF' };
                    }
                }
                setDatesState({
                    markedDates: markedDates,
                    isStartDatePicked: false,
                    isEndDatePicked: true,
                    startDate: ''
                });


            } else {
                alert('Select an upcomming date!');
            }
        }
    }

    const applyHandler = () => {
        const { startDate, endDate } = extractStartAndEndDates(datesState.markedDates)
        setAdvertData({ ...advertData, startTime: startDate, endTime: endDate })
        setIsModalVisible(false)
    }

    return (
        <View>
            <UkrCalendar
                markedDates={datesState?.markedDates}
                minDate={Date()}
                markingType="period"
                {...props}
                onDayPress={onDayPress}
            />
            <TouchableOpacity onPress={applyHandler}><View style={AdvertCreationCalendarStyles.applyButton}>
                <Text style={{ color: Colors.white }}>Підтвердити</Text>
            </View></TouchableOpacity>
        </View>
    )
}