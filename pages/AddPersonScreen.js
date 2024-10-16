import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { PeopleContext } from '../context/PeopleContext';
import { randomUUID } from "expo-crypto";
import Icon from 'react-native-vector-icons/Ionicons';

const AddPersonScreen = ({ navigation }) => {
  const { addPerson } = useContext(PeopleContext);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');  
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleSave = () => {
    if (!name || !dob) {
      setErrorModalVisible(true);
      return;
    }

    const person = {
      id: randomUUID(),
      name,
      dob,
    };

    addPerson(person);
    navigation.goBack();  
  };

  const closeModal = () => {
    setErrorModalVisible(false);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.labelText}>Enter Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.labelText}>Date of Birth: {dob || 'Select Date'}</Text>
          <DatePicker
            onSelectedChange={date => setDob(date)}
            mode="calendar"
            style={styles.datePicker}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Icon name="close-circle-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Icon name="checkmark-circle-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={errorModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Error: Please provide both name and date of birth.</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FFFA',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#008080',
    marginBottom: 10,
  },
  input: {
    borderColor: '#008080',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff',  // White background for the input
  },
  datePicker: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#008080',  // Green for Save
    padding: 16,
    borderRadius: 5,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',  // Red for Cancel
    padding: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddPersonScreen;
