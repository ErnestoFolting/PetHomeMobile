import { Modal, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ModalStyles from './ModalStyles'
import Colors from '../../Constants/Colors'

export default function MyModal({ isModalVisible, setIsModalVisible, content, check }) {
    return (
        <Modal
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(!isModalVisible)}
        >
            <TouchableOpacity
                style={ModalStyles.modalBackground}
                onPress={() => setIsModalVisible(!isModalVisible)}
            >
                <View style={ModalStyles.blurView} />
                <View style={ModalStyles.modalContainer}>
                    <TouchableOpacity
                        activeOpacity={1} // To disable the opacity change on press
                    >
                        <View style={ModalStyles.content}>
                            {content}
                        </View>

                        <TouchableOpacity style={ModalStyles.closeButton} onPress={() => setIsModalVisible(!isModalVisible)}>
                            <Text style={{ color: Colors.white }}>Закрити</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}