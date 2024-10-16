import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { PeopleContext } from '../context/PeopleContext';
import Icon from 'react-native-vector-icons/Ionicons'; 

const IdeaScreen = ({ route, navigation }) => {
  const { getPersonIdeas, deleteIdea } = useContext(PeopleContext);
  const { id } = route.params;

  const person = getPersonIdeas(id);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIdeaId, setSelectedIdeaId] = useState(null);

  const confirmDeleteIdea = (ideaId) => {
    setSelectedIdeaId(ideaId);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedIdeaId) {
      await deleteIdea(id, selectedIdeaId);
      setModalVisible(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.ideaContainer}>
      <Image source={{ uri: item.img }} style={styles.thumbnail} />
      <Text style={styles.ideaText}>{item.text}</Text>
      <TouchableOpacity onPress={() => confirmDeleteIdea(item.id)} style={styles.deleteIconButton}>
        <Icon name="trash-outline" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Ideas for {person?.name || 'Unknown Person'}</Text>

      <FlatList
        data={person?.ideas || []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No ideas yet. Add one!</Text>}
      />

      {/* Modal for delete confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete this idea?</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5FFFA', // Mint green background
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#008080',  // Teal color for the heading
    marginBottom: 20,
  },
  ideaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFE4C4',  // Coral-tinted background for each item
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,  // Shadow effect for modern look
  },
  ideaText: {
    fontSize: 18,
    color: '#333',
    flex: 1,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  thumbnail: {
    width: 60,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#008080',  // Coral border to match the theme
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#FF6F61',
    borderRadius: 30,
    padding: 10,
  },
  deleteIconButton: {
    marginLeft: 10,
    backgroundColor: '#FF6F61',
    borderRadius: 30,
    padding: 8,  // Reduce padding to fit the icon properly
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FF6F61',  // Coral color for empty state text
    marginTop: 50,
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

export default IdeaScreen;
