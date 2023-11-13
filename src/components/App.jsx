import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { ContactForm }  from "./ContactForm";
import  Filter  from "./Filter";
import  ContactList  from "./ContactList";

const phoneContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
 
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? phoneContacts; 
  });

  const [filter, setFilter] = useState('');

  
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const addContact = contact => {
    const isInContacts = contacts.some(
      ({ name }) =>
        name.toLowerCase().trim() === contact.name.toLowerCase().trim()
    );
    
    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), ...contact },
    ]);
  };

 
  const changeFilter = event => {
    setFilter(event.target.value.trim());
  };


  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

 
  const removeContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      <h1>Phonebook</h1>

      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        
        <Filter value={filter} onChangeFilter={changeFilter} />
      ) : (
        <div>Your phonebook is empty. Add first contact!</div>
      )}
      {contacts.length > 0 && (
        
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </>
  );
};

export default App;
