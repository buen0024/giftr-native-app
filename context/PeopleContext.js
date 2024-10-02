import React, {createContext, useState} from 'react';

export const PeopleContext = createContext();

export const PeopleProvider = ({children}) => {
  const [people, setPeople] = useState([]);

  const addPerson = (person) => {
    setPeople((prevPeople) => [...prevPeople, person]);
  };

  return (
    <PeopleContext.Provider value={{people,addPerson}}>
      {children}
    </PeopleContext.Provider>
  )
}