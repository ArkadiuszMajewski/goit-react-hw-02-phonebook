import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  addContact = ({ name, number }) => {
    this.setState(({ contacts }) => {
      let newContactAdded = contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );

      if (newContactAdded) {
        alert(`${name} is already in contacts.`);
        return contacts;
      } else {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        return {
          contacts: [newContact, ...contacts],
        };
      }
    });
  };

  deleteContact = index => {
    this.setState(prevState => {
      // console.log(index);
      const newListOfContacts = [...prevState.contacts];

      newListOfContacts.splice(index, 1);
      return { contacts: newListOfContacts };
    });
  };

  filterOnChange = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };

  filteredContacts = () => {
    if (this.state.contacts !== []) {
      return this.state.contacts
        .map(
          contact =>
            contact.name
              .toLowerCase()
              .includes(this.state.filter.toLowerCase()) && contact
        )
        .filter(contact => contact !== false);
    }
  };

  componentDidUpdate() {
    // console.log('sadasds');
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
  componentDidMount() {
    const localStorageElem = localStorage.getItem('contacts');
    // console.log(localStorageElem);
    this.setState(prevState => ({
      ...prevState,
      contacts: JSON.parse(localStorageElem),
    }));
  }

  render() {
    const newContacts = this.filteredContacts();
    // console.log(newContacts);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.filterOnChange} />
        {newContacts !== [] ? (
          <ContactList
            contacts={newContacts}
            deleteContact={this.deleteContact}
          />
        ) : (
          <p>No contacts</p>
        )}
      </div>
    );
  }
}

export default App;
