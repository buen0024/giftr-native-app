import React, {createContext, useState} from 'react';

export const PeopleContext = createContext();

export const PeopleProvider = ({children}) => {
  const [people, setPeople] = useState([]);

  const addPerson = (person) => {
    setPeople((prevPeople) => [...prevPeople, person]);
  };

  const removePerson = (personId) => {
    setPeople((prevPeople) => prevPeople.filter((person) => person.id !== personId))
  }

  return (
    <PeopleContext.Provider value={{people,addPerson,removePerson}}>
      {children}
    </PeopleContext.Provider>
  )
}