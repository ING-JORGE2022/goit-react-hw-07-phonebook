import React, { useEffect } from 'react';

import Title from './Title/Title';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/operations';
import { selectContacts } from 'redux/selectors';

export function App() {
  const { items: contacts, isLoading, error } = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <div className="form">
      <Title text="Phonebook" />
      <ContactForm />
      {!isLoading && contacts[0] && (
        <>
          <Title text="Contacts" />
          <Filter />
          <ContactList />
        </>
      )}
      {isLoading && <div style={{ margin: 20 }}>Loading data...</div>}
      {error && <div style={{ margin: 20 }}>{error}</div>}
    </div>
  );
}
