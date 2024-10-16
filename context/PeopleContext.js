import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const PeopleContext = createContext();

export const PeopleProvider = ({children}) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    loadPeopleFromStorage();
  }, []);

  const loadPeopleFromStorage = async() => {
    const storedPeople = await AsyncStorage.getItem('people');
    if(storedPeople) {
      setPeople(JSON.parse(storedPeople));
    }
  }

  const addPerson = (person) => {
    setPeople((prevPeople) => {
      const updatedPeople = [...prevPeople, person];
      AsyncStorage.setItem('people',JSON.stringify(updatedPeople));
      return updatedPeople;
    });
  };

  const removePerson = (personId) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person.id !== personId))
  }

  const saveIdea = async(personId,idea) => {
    const updatedPeople = people.map(person => {
      if(person.id === personId){
        person.ideas = [...(person.ideas || []), idea];
      }
      return person;
    });

    setPeople(updatedPeople);
    await AsyncStorage.setItem('people',JSON.stringify(updatedPeople));
  }

  const getPersonIdeas = (personId) => {
    return people.find((person) => person.id === personId) || {};
  };


  const deleteIdea = async (personId, ideaId) => {
    const updatedPeople = people.map(person => {
      if(person.id === personId){
        person.ideas = person.ideas.filter((idea) => idea.id !== ideaId);
      }
      return person;
    });

    setPeople(updatedPeople);
    await AsyncStorage.setItem('people', JSON.stringify(updatedPeople));
  };

  return (
    <PeopleContext.Provider value={{people,addPerson,removePerson, saveIdea, getPersonIdeas, deleteIdea }}>
      {children}
    </PeopleContext.Provider>
  )
}