import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PeopleScreen from './pages/PeopleScreen';
import AddPersonScreen from "./pages/AddPersonScreen";
import IdeaScreen from './pages/IdeaScreen';
import AddIdeaScreen from './pages/AddIdeaScreen';
import { PeopleProvider } from "./context/PeopleContext";
import Icon from 'react-native-vector-icons/Ionicons';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PeopleProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="People"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#F5FFFA',
              },
              headerTitleStyle: {
                color: '#FF6F61', 
                fontWeight: 'bold',
              },
              headerTintColor: '#008080', 
            }}
          >
            <Stack.Screen 
              name="People" 
              component={PeopleScreen} 
              options={({ navigation }) => ({
                title: 'People List',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddPerson')}
                    style={styles.headerButton}
                  >
                    <Icon name="person-add-outline" size={24} color="#fff" />
                    <Text style={styles.headerButtonText}>Add Person</Text> 
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen 
              name="AddPerson" 
              component={AddPersonScreen} 
              options={{ title: 'Add Person' }}
            />
            <Stack.Screen 
              name="Idea"
              component={IdeaScreen}
              options={({ navigation, route }) => ({
                title: 'Idea Screen',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddIdea', { personId: route.params.id })}
                    style={styles.headerButton}
                  >
                    <Icon name="bulb-outline" size={24} color="#fff" />
                    <Text style={styles.headerButtonText}>Add Idea</Text>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen 
              name="AddIdea" 
              component={AddIdeaScreen} 
              options={{ title: 'Add Idea' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PeopleProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#008080',  
    padding: 8,
    borderRadius: 5,
  },
  headerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
