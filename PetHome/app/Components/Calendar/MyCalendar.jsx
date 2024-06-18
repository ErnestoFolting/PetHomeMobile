import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyCalendarStyles from './MyCalendarStyles';
import Colors from '../../Constants/Colors';
import { processDates } from './CalendarHelper';
import useFetching from '../../Hooks/useFetching';
import TimeExceptionService from '../../HTTP/API/TimeExceptionService';
import Loader from '../Loader/Loader';
import UkrCalendar from './UkrCalendar';
import MyButton from '../Common/MyButton';
import { useFocusEffect } from '@react-navigation/native';
import MyModal from '../MyModal/MyModal';


export default function MyCalendar() {

    const [datesChanging, setDatesChanging] = useState(false)
    const [needUpdate, setNeedUpdate] = useState(false)
    const [timeExceptions, setTimeExceptions] = useState([])
    const [datesToUpdate, setDatesToUpdate] = useState({ datesToAdd: [], datesToDelete: [] })
    const [dates, setDates] = useState({})
    const [prevDates, setPrevDates] = useState({})

    const [updateDates, loading, error] = useFetching(async () => {
        if (datesToUpdate.datesToAdd.length) {
            await TimeExceptionService.addUserTimeExceptions(datesToUpdate.datesToAdd)
        }
        if (datesToUpdate.datesToDelete.length) {
            await TimeExceptionService.deleteUserTimeExceptions(datesToUpdate.datesToDelete)
        }

    })

    const [fetchDates, loading2, error2] = useFetching(async () => {
        const response = await TimeExceptionService.getUserTimeExceptions()
        setTimeExceptions(response)
    })

    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                await updateDates()
                setNeedUpdate(!needUpdate)
            } catch (e) {
                console.log(e);
            }
        }
        if (datesToUpdate.datesToAdd.length || datesToUpdate.datesToDelete.length) {
            fetchData()
        }
    }, [datesToUpdate])

    useEffect(() => {
        fetch()
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            fetch();
        }, [])
    );

    async function fetch() {
        try {
            await fetchDates()
        } catch (e) {
            console.log(e);
        }
    }

    const selectHandler = (date) => {
        if (datesChanging) {
            const updatedData = { ...dates }
            if (updatedData[date]) {
                delete updatedData[date];
            } else {
                updatedData[date] = { selected: true, selectedColor: Colors.red };
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
                markedDates[exception.date.split('T')[0]] = { selected: true, selectedColor: Colors.red };
            });
            setDates(markedDates)
        }

    }, [timeExceptions])


    if (loading || loading2) return <Loader />
    return (
        <View>
            <MyModal
                content={<View>
                    <Text>{error}{error2}</Text>
                </View>
                }
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
            <UkrCalendar
                markedDates={dates}
                style={MyCalendarStyles.calendar}
                onDayPress={(day) => selectHandler(day.dateString)}
            />
            {datesChanging
                ? <MyButton style={{ backgroundColor: Colors.green }} onPress={saveHandler} isRound>Зберегти</MyButton>
                : <MyButton style={{ backgroundColor: Colors.light }} onPress={changeHandler} isRound>Змінити</MyButton>
            }
        </View>
    )
}