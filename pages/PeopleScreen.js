import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { PeopleContext } from '../context/PeopleContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { Swipeable } from 'react-native-gesture-handler';

const PeopleScreen = ({ navigation }) => {
  const { people, removePerson } = useContext(PeopleContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState(null);

  
  const sortedPeople = [...people].sort((a, b) => {
    const [aMonth, aDay] = a.dob.split('/').map(Number);
    const [bMonth, bDay] = b.dob.split('/').map(Number);

    if (aMonth !== bMonth) {
      return aMonth - bMonth;
    }
    return aDay - bDay;
  });

  const toIdeaScreen = (personId) => {
    navigation.navigate('Idea', { id: personId });
  };

  const confirmDeletePerson = (personId) => {
    setSelectedPersonId(personId);
    setModalVisible(true);
  };

  const handleDelete = () => {
    if (selectedPersonId) {
      removePerson(selectedPersonId);
    }
    setModalVisible(false);
  };

  const renderRightActions = (personId) => (
    <TouchableOpacity onPress={() => confirmDeletePerson(personId)} style={styles.deleteBtn}>
      <Icon name="trash-outline" size={30} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {people.length === 0 ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>No people added yet. Add your first person!</Text>
        </View>
      ) : (
        <FlatList
          data={sortedPeople}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item.id)}>
              <TouchableOpacity style={styles.personContainer} onPress={() => toIdeaScreen(item.id)}>
                <View style={styles.personInfo}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Text style={styles.dobText}>{item.dob}</Text>
                </View>
                <View>
                  <Icon name="gift-outline" size={40} color="#FF6F61" />
                </View>
              </TouchableOpacity>
            </Swipeable>
          )}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete this person?</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.deleteButton]} onPress={handleDelete}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FFFA',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  messageText: {
    fontSize: 18,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  personContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFE4C4',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  personInfo: {
    flexDirection: 'column',
  },
  nameText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
  },
  dobText: {
    fontSize: 14,
    color: '#008080',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deleteBtn: {
    backgroundColor: '#FF6F61',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 15,
    borderRadius: 15,
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
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PeopleScreen;
