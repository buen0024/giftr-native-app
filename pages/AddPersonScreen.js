import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { PeopleContext } from '../context/PeopleContext';

const AddPersonScreen = ({ navigation }) => {
  const {addPerson} = useContext(PeopleContext);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleConfirm = (date) => {
    setDob(date.toLocaleDateString()); // Set the date when confirmed
    setDatePickerVisible(false); // Hide the date picker
  };

  const handleSave = () => {
    if (!name || !dob) {
      Alert.alert('Error', 'Please provide both name and date of birth.');
      return;
    }

    const person = {
      name,
      dob,
    };

    addPerson(person);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View>
        <Text>Enter Name:</Text>
        <TextInput
          style={{
            borderColor: '#ccc',
            borderWidth: 1,
            padding: 10,
            marginBottom: 20,
            borderRadius: 5,
            fontSize: 16,
          }}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <Text>Date of Birth: {dob}</Text>
        <Button title="Select Date" onPress={() => setDatePickerVisible(true)} />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisible(false)}
        />

        <View style={{ marginTop: 20 }}>
          <Button title="Save Person" onPress={handleSave} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddPersonScreen;
