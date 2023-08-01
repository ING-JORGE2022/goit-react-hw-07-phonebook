import React, { memo, useState } from 'react';
import './ContactForm.css';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { postContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';

const fieldIdName = nanoid();
const fieldIdNumber = nanoid();

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const { items: contacts } = useSelector(selectContacts);
  const dispatch = useDispatch();

  const checkContactName = () => {
    return contacts.some(el => el.name === name);
  };

  const onChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        console.warn('чекни это');
        break;
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    if (checkContactName()) {
      Notiflix.Notify.failure(`${name} is already in contacts.`);
      return;
    }

    const obj = {
      name,
      phone: number,
      id: nanoid(),
    };

    dispatch(postContact(obj));

    setName('');
    setNumber('');
  };

  return (
    <>
      <form className="formInput" onSubmit={onSubmit}>
        <div className="input">
          <label htmlFor={fieldIdName}>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            id={fieldIdName}
            onChange={onChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className="input">
          <label htmlFor={fieldIdNumber}>Number</label>
          <input
            type="tel"
            name="number"
            value={number}
            id={fieldIdNumber}
            onChange={onChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button className="button" type="submit">
          Add contact
        </button>
      </form>
    </>
  );
}

export default memo(ContactForm);
