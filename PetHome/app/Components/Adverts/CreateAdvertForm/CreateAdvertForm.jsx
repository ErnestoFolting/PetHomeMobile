import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react'
import MyModal from '../../MyModal/MyModal'
import AdvertCreationCalendar from '../../Calendar/AdvertCreationCalendar/AdvertCreationCalendar'
import CreateAdvertFormStyles from './CreateAdvertFormStyles'
import LocationBlock from '../../Location/LocationBlock/LocationBlock'
import Loader from '../../Loader/Loader'
import MyButton from '../../Common/MyButton'
import Colors from '../../../Constants/Colors'
import { dateWithoutTime } from '../../../Helpers/StringsHelper';

export default function CreateAdvertForm({ advertData, setAdvertData, imageUri, setImageUri, handleSubmit, isLoading, isModal }) {

    const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false)
    const [isLocationChanging, setIsLocationChanging] = useState(false)

    const selectImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (!pickerResult.cancelled) {
            const uri = pickerResult.assets[0].uri;
            setImageUri(uri);
        }
    };

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
                        style={CreateAdvertFormStyles.input}
                    />

                    <TextInput
                        placeholder='Опис оголошення'
                        value={advertData.description}
                        onChangeText={text => setAdvertData({ ...advertData, description: text })}
                        style={CreateAdvertFormStyles.input}
                    />

                    <TextInput
                        placeholder='Вартість*'
                        value={String(advertData?.cost)}
                        onChangeText={text => setAdvertData({ ...advertData, cost: text })}
                        style={CreateAdvertFormStyles.input}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity style={CreateAdvertFormStyles.boxInput} onPress={() => setIsCalendarModalVisible(true)}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>📅 Обрати дати</Text>
                            {advertData?.startTime && <Text style={{ marginTop: 5 }}>{dateWithoutTime(advertData?.startTime)} до {dateWithoutTime(advertData?.endTime)}</Text>}
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={selectImage} style={CreateAdvertFormStyles.boxInput}>
                        <Text style={CreateAdvertFormStyles.imageInputLabel}>Зображення оголошення*</Text>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={CreateAdvertFormStyles.image} />
                        ) : (
                            <Text style={CreateAdvertFormStyles.imagePlaceholder}>Торкніться, щоб вибрати зображення</Text>
                        )}
                    </TouchableOpacity>

                    {!isLocationChanging && advertData?.location !== "Fastiv"  //location is set
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