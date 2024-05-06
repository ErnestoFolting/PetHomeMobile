import { Calendar, LocaleConfig } from 'react-native-calendars';
import localeObject from './localeObject';
import React from 'react'

LocaleConfig.locales['uk'] = localeObject
LocaleConfig.defaultLocale = 'uk';

export default function UkrCalendar({ ...props }) {
    const { markedDates } = props
    return (
        <Calendar
            initialDate={Object.keys(markedDates)[0]}
            {...props}
            monthFormat={'MMM yyyy'}
            dayNamesShort={['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
            monthNames={['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']}
        />
    )
}