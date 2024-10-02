import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { PeopleContext } from '../context/PeopleContext';

const PeopleScreen = () => {
  const { people } = useContext(PeopleContext);

  // Sort people by month and day of birth
  const sortedPeople = [...people].sort((a, b) => {
    const [aYear, aMonth, aDay] = a.dob.split('/').map(Number);
    const [bYear, bMonth, bDay] = b.dob.split('/').map(Number);

    if (aMonth !== bMonth) {
      return aMonth - bMonth; // Sort by month first
    }
    return aDay - bDay; // Then sort by day
  });


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
            <View style={styles.personContainer}>
              <Text style={styles.personText}>Name: {item.name}</Text>
              <Text style={styles.personText}>DOB: {item.dob}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 18,
    color: 'gray',
  },
  personContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  personText: {
    fontSize: 16,
  },
});

export default PeopleScreen;
