import { useState, useEffect } from 'react';
import storage from '../helpers/storage';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { Main, Title, SubTitle, Notice } from './App.styled';

const DEFAULT_FRIENDS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  // state = {
  //   contacts: [],
  //   filter: '',
  // };

  const [contacts, setContacts] = useState(
    storage.load('contacts-list') ?? DEFAULT_FRIENDS
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    storage.save('contacts-list', contacts);
  }, [contacts]);

  // componentDidMount() {
  //   const savedContacts = storage.load('contacts-list') ?? DEFAULT_FRIENDS;
  //   this.setState({ contacts: savedContacts });
  // }
  // componentDidUpdate(_, prevState) {
  //   const { contacts } = this.state;
  //   if (prevState.contacts !== contacts) {
  //     storage.save('contacts-list', contacts);
  //   }
  // }

  const addContact = contact => {
    if (
      contacts.some(
        el => el.name.toLowerCase().trim() === contact.name.toLowerCase().trim()
      )
    ) {
      alert(`${contact.name} is already in contacts!`);
      return;
    }

    setContacts(prevState => [...prevState, { ...contact, id: nanoid() }]);

    // this.setState(prevState => {
    //   return contacts: [...prevState.contacts, { ...contact, id: nanoid() }];
    // });
  };

  const handleFilter = ({ target: { value } }) => {
    // this.setState({ filter: value });
    setFilter(value);
  };

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
    // this.setState({
    //   contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    // });
  };

  return (
    <Main>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />

      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        <Filter onChange={handleFilter} value={filter} />
      ) : (
        <Notice>You don't have contacts yet...</Notice>
      )}
      <ContactList
        contactsList={filteredContacts()}
        deleteContact={deleteContact}
      />
    </Main>
  );
};
