import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'

import React, { useState } from 'react'
import MyModal from '../../MyModal/MyModal'
import AdvertCreationCalendar from '../../Calendar/AdvertCreationCalendar/AdvertCreationCalendar'
import CreateAdvertFormStyles from './CreateAdvertFormStyles'
import LocationBlock from '../../Location/LocationBlock/LocationBlock'
import Loader from '../../Loader/Loader'
import MyButton from '../../Common/MyButton'
import Colors from '../../../Constants/Colors'
import { dateWithoutTime } from '../../../Helpers/StringsHelper';
import ImageSelector from '../../ImageSelector/ImageSelector'

export default function CreateAdvertForm({ advertData, setAdvertData, imageUri, setImageUri, handleSubmit, isLoading, isModal, errors }) {

    const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false)
    const [isLocationChanging, setIsLocationChanging] = useState(false)

    return (
        <View style={[!isModal && { flex: 1 }]}>
            <MyModal
                content={<View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: 'grey' }}>Оберіть дати</Text>
                    <AdvertCreationCalendar
                        setAdvertData={setAdvertData}
                        advertData={advertData}
                        setIsModalVisible={setIsCalendarModalVisible}
                    />
                </View>
                }
                isModalVisible={isCalendarModalVisible}
                setIsModalVisible={setIsCalendarModalVisible}
            />

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }} keyboardShouldPersistTaps={'handled'}>
                <View style={[!isModal && CreateAdvertFormStyles.form]}>
                    <TextInput
                        placeholder='Назва оголошення*'
                        value={advertData.name}
                        onChangeText={text => setAdvertData({ ...advertData, name: text })}
                        style={[CreateAdvertFormStyles.input, errors.name && CreateAdvertFormStyles.inputError]}
                    />

                    <TextInput
                        placeholder='Опис оголошення'
                        value={advertData.description}
                        onChangeText={text => setAdvertData({ ...advertData, description: text })}
                        style={[CreateAdvertFormStyles.input, errors.description && CreateAdvertFormStyles.inputError]}

                    />

                    <TextInput
                        placeholder='Вартість*'
                        value={String(advertData?.cost)}
                        onChangeText={text => setAdvertData({ ...advertData, cost: text })}
                        style={[CreateAdvertFormStyles.input, errors.cost && CreateAdvertFormStyles.inputError]}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity style={CreateAdvertFormStyles.boxInput} onPress={() => setIsCalendarModalVisible(true)}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>📅 Обрати дати</Text>
                            {advertData?.startTime && <Text style={{ marginTop: 5 }}>{dateWithoutTime(advertData?.startTime)} до {dateWithoutTime(advertData?.endTime)}</Text>}
                        </View>
                    </TouchableOpacity>

                    <ImageSelector imageUri={imageUri} setImageUri={setImageUri} />

                    {!isLocationChanging && advertData?.location !== ""  //location is set
                        ? <View>
                            <Text style={{ marginBottom: 10 }}>📍{advertData?.location}</Text>
                            {isModal && <MyButton onPress={() => setIsLocationChanging(true)} isRound>Змінити локацію</MyButton>}
                        </View>

                        : <LocationBlock data={advertData} setData={setAdvertData} inRedo setIsLocationChanging={setIsLocationChanging} />
                    }

                    {isLoading ? <Loader /> : <TouchableOpacity onPress={handleSubmit} style={[CreateAdvertFormStyles.button, isModal && { backgroundColor: Colors.green }]}>
                        <Text style={CreateAdvertFormStyles.buttonText}>{isModal ? "Зберегти" : "Створити оголошення"}</Text>
                    </TouchableOpacity>}

                </View>

            </ScrollView>
        </View>
    )
}