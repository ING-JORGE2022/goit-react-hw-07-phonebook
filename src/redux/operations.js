const { createAsyncThunk } = require('@reduxjs/toolkit');
const { fetchContacts, addContact, deleteContact } = require('services/api');

export const getContacts = createAsyncThunk('contacts/fetchAll', fetchContacts);

export const postContact = createAsyncThunk('contacts/addContact', addContact);

export const delContact = createAsyncThunk(
  'contacts/deleteContact',
  deleteContact
);
