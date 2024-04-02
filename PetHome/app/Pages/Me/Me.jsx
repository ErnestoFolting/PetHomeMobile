import { View, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import UserDataService from "../../HTTP/API/UserDataService"
import { Image, Button } from 'react-native'
import useFetching from "../../Hooks/useFetching"
import MeStyles from "./MeStyles"
import { Calendar, LocaleConfig } from 'react-native-calendars';
import API_URL from "../../Constants/uri"
import Colors from "../../Constants/Colors"

LocaleConfig.locales['uk'] = {
    monthNames: [
        'Січень',
        'Лютий',
        'Березень',
        'Квітень',
        'Травень',
        'Червень',
        'Липень',
        'Серпень',
        'Вересень',
        'Жовтень',
        'Листопад',
        'Грудень'
    ],
    monthNamesShort: [
        'Січ.',
        'Лют.',
        'Бер.',
        'Квіт.',
        'Трав.',
        'Черв.',
        'Лип.',
        'Серп.',
        'Вер.',
        'Жовт.',
        'Лист.',
        'Груд.'
    ],
    dayNames: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'],
    dayNamesShort: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сьогодні'
}

LocaleConfig.defaultLocale = 'uk';

export default function Me() {
    const [profile, setProfile] = useState({})
    const [dates, setDates] = useState({})
    const [fetchUserData, loading, error] = useFetching(async () => {
        const userResponse = await UserDataService.getUserProfile()
        setProfile(userResponse)

    })
    useEffect(() => {

        async function fetchData() {
            try {
                await fetchUserData()
                const markedDates = {};

                profile.timeExceptions.forEach((exception) => {
                    markedDates[exception.date.split('T')[0]] = { marked: true };
                });
                setDates(markedDates)
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [])
    console.log(profile);



    if (loading) return <View><Text>Завантаження...</Text></View>

    return (
        <ScrollView style={MeStyles.container}>
            <View style={MeStyles.header}>
                <Image source={{
                    uri:
                        API_URL +
                        profile.photoFilePath
                }} style={MeStyles.photo} />
                <Text style={MeStyles.name}>{profile.name} {profile.surname}</Text>
            </View>
            <View style={MeStyles.infoContainer}>

                <View style={MeStyles.leftSide}>
                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>✉️</Text>
                        <Text style={MeStyles.value}>{profile.email}</Text>
                    </View>
                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>📍</Text>
                        <Text style={MeStyles.value}>{profile.location}</Text>
                    </View>
                </View>

                <View style={MeStyles.rightSide}>
                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>📞</Text>
                        <Text style={MeStyles.value}>{profile.phoneNumber}</Text>
                    </View>
                    <View style={MeStyles.infoRow}>
                        <Text style={MeStyles.label}>{profile.sex == 'male' ? '👨' : '👩'}</Text>
                        <Text style={MeStyles.value}>{profile.sex == 'male' ? 'чоловік' : 'жінка'}</Text>
                    </View>
                </View>

            </View>
            <View style={MeStyles.calendarContainer}>
                <View style={MeStyles.calendarText}><Text style={MeStyles.label}>Графік зайнятості</Text></View>
                <Calendar
                    markedDates={dates}
                    style={MeStyles.calendar}
                    monthFormat={'MMM yyyy'}
                    dayNamesShort={['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
                    monthNames={['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']}
                    onDayPress={(day) => console.log('selected day', day)}
                />
                <View style={MeStyles.buttons}><Button title='Змінити дати' color={Colors.white}></Button></View>
            </View>

        </ScrollView>
    );
}

