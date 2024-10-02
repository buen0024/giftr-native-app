import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Button } from 'react-native';
import PeopleScreen from './pages/PeopleScreen'
import AddPersonScreen from "./pages/AddPersonScreen";
// import IdeaScreen from './pages/IdeaScreen'
// import AddIdeaScreen from './pages/AddIdeaScreen'
import { PeopleProvider } from "./context/PeopleContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PeopleProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="People">
          <Stack.Screen 
            name="People" 
            component={PeopleScreen} 
            options={({ navigation }) => ({
              title: 'People List',
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('AddPerson')}
                  title="Add Person"
                  color="#007bff"
                />
              ),
            })}
          />
          <Stack.Screen 
            name="AddPerson" 
            component={AddPersonScreen} 
            options={{ title: 'Add Person' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PeopleProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

{/* <Stack.Screen name="Idea" component={IdeaScreen} />
        <Stack.Screen name="AddPerson" component={AddPersonScreen} />
        <Stack.Screen name="AddIdea" component={AddIdeacreen} /> */}
