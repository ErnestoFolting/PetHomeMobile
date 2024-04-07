import { View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import localeObject from './localeObject';
import MyCalendarStyles from './MyCalendarStyles';
import Colors from '../../Constants/Colors';
import { processDates } from './CalendarHelper';

LocaleConfig.locales['uk'] = localeObject

LocaleConfig.defaultLocale = 'uk';

export default function MyCalendar({ timeExceptions, setDatesToUpdate }) {

    const [datesChanging, setDatesChanging] = useState(false)

    const [dates, setDates] = useState({})
    const [prevDates, setPrevDates] = useState({})

    const selectHandler = (date) => {
        if (datesChanging) {
            const updatedData = { ...dates }
            if (updatedData[date]) {
                delete updatedData[date];
            } else {
                updatedData[date] = { selected: true, selectedColor: 'red' };
            }
            setDates(updatedData)
        }
    }

    const changeHandler = () => {
        setDatesChanging(!datesChanging)
        setPrevDates(dates)
    }

    const saveHandler = () => {
        setDatesChanging(!datesChanging)

        const { deleteDates, addDates } = processDates(prevDates, dates)

        setDatesToUpdate({ datesToAdd: addDates, datesToDelete: deleteDates })
    }

    useEffect(() => {
        if (timeExceptions) {
            const markedDates = {};
            timeExceptions.forEach((exception) => {
                markedDates[exception.date.split('T')[0]] = { selected: true, selectedColor: 'red' };
            });
            setDates(markedDates)
        }

    }, [timeExceptions])

    return (
        <View>
            <Calendar
                markedDates={dates}
                style={MyCalendarStyles.calendar}
                monthFormat={'MMM yyyy'}
                dayNamesShort={['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
                monthNames={['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']}
                onDayPress={(day) => selectHandler(day.dateString)}
            />
            {datesChanging
                ? <View style={MyCalendarStyles.buttonSave}><Button title='Зберегти' color={Colors.white} onPress={saveHandler}></Button></View>
                : <View style={MyCalendarStyles.buttons}><Button title='Змінити дати' color={Colors.white} onPress={changeHandler}></Button></View>
            }
        </View>

    )
}