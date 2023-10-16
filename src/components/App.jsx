import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', text: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', text: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', text: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', text: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const handleAddContact = (text, number) => {
    setContacts((prevContacts) => [
      { id: nanoid(), text, number },
      ...prevContacts,
    ]);
  };

  const deleteContact = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const normalisedFilter = filter.toLowerCase();

  const filterContacts = contacts.filter((contact) =>
    contact.text
      .replace(/\s+/g, '')
      .toLowerCase()
      .includes(normalisedFilter.replace(/\s+/g, ''))
  );

  return (
    <div className="Container">
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} onSubmit={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />
      <ContactList contacts={filterContacts} onDeleteContact={deleteContact} />
    </div>
  );
}
