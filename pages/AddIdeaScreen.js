import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity, Image, Pressable, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from "expo-camera";
import { PeopleContext } from '../context/PeopleContext';
import { useRoute } from '@react-navigation/native';
import { randomUUID } from 'expo-crypto';  // Generate unique IDs
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const AddIdeaScreen = ({ navigation }) => {
  const { saveIdea } = useContext(PeopleContext);
  const route = useRoute();
  const { personId } = route.params;

  const [text, setText] = useState('');
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false); // State for modal visibility
  const cameraRef = useRef(null);

  const aspectRatio = 2 / 3; 
  const imageWidth = screenWidth * 0.7;
  const imageHeight = imageWidth * aspectRatio;

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
      });
      setImageUri(photo.uri);  // Save the image URI for preview
    }
  };

  if (!permission || permission.status !== 'granted') {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera access is required to take a picture.</Text>
        <Pressable style={styles.requestButton} onPress={requestPermission}>
          <Text style={styles.buttonText}>Request Camera Permission</Text>
        </Pressable>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleSave = () => {
    if (!text || !imageUri) {
      setErrorModalVisible(true); // Show error modal if validation fails
      return;
    }

    const idea = {
      id: randomUUID(),
      text,
      img: imageUri,
      width: imageWidth,
      height: imageHeight,
    };

    saveIdea(personId, idea);
    navigation.goBack();  // Navigate back to IdeaScreen
  };

  const handleCancel = () => {
    navigation.navigate('People');  // Navigate back to PeopleScreen
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false); // Hide the modal
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gift Idea Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Gift Idea"
            placeholderTextColor="#999"
            value={text}
            onChangeText={setText}
          />
        </View>

        <View style={styles.cameraContainer}>
        {!imageUri ? (
          <>
            <CameraView
              ref={cameraRef}
              style={{ width: imageWidth, height: imageHeight, borderRadius: 5, overflow: 'hidden' }}
              facing={facing}
            >
              <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
                <Icon name="camera-reverse-outline" size={30} color="white" />
              </TouchableOpacity>
            </CameraView>

            <View style={styles.captureIconContainer}>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <Icon name="camera-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
            <TouchableOpacity style={styles.captureButton} onPress={() => setImageUri(null)}>
              <Text style={styles.captureText}>Retake</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={[styles.pressableButton, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.pressableText}>Cancel</Text>
        </Pressable>
        <Pressable style={[styles.pressableButton, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.pressableText}>Save</Text>
        </Pressable>
      </View>
      </KeyboardAvoidingView>

      
      <Modal
        visible={errorModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeErrorModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Error: Please provide both a name for the idea and a picture.</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeErrorModal}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
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
    backgroundColor: '#F5FFFA',
  },
  keyboardAvoidingView: {
    paddingBottom: 10,  // Reduce the padding to bring the input closer to the camera
  },
  inputContainer: {
    marginBottom: 50,  // Reduce margin between input and camera
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff6f61',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    backgroundColor: '#F5FFFA',
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#ff6f61',
  },
  cameraContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 50,
  },
  flipButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    padding: 10,
  },
  captureIconContainer: {
    position: 'absolute',
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  captureButton: {
    backgroundColor: '#ff6f61',
    borderRadius: 50,
    padding: 8,
  },
  previewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  previewImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  captureText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,  // Add margin to separate buttons from camera
  },
  pressableButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  pressableText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  saveButton: {
    backgroundColor: '#008080',
  },
  requestButton: {
    backgroundColor: '#ff6f61',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ff6f61',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    backgroundColor: '#ff6f61',
    borderRadius: 10,
    padding: 10,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddIdeaScreen;
