import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { delContact, getContacts, postContact } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const PENDING = state => {
  state.isLoading = true;
  state.error = null;
};

const REJECTED = state => {
  state.isLoading = false;
  state.error = 'Error';
};

const getContactsFulfilled = (state, action) => {
  state.isLoading = false;
  state.items = [...action.payload];
};

const postContactFulfilled = (state, action) => {
  state.isLoading = false;
  state.items = [...state.items, action.payload];
};

const delContactFulfilled = (state, action) => {
  state.isLoading = false;
  state.items = [...state.items.filter(el => el.id !== action.payload.id)];
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getContacts.fulfilled, (state, action) =>
        getContactsFulfilled(state, action)
      )
      .addCase(postContact.fulfilled, (state, action) =>
        postContactFulfilled(state, action)
      )
      .addCase(delContact.fulfilled, (state, action) =>
        delContactFulfilled(state, action)
      )
      .addMatcher(
        isAnyOf(getContacts.pending, postContact.pending, delContact.pending),
        PENDING
      )
      .addMatcher(
        isAnyOf(
          getContacts.rejected,
          postContact.rejected,
          delContact.rejected
        ),
        REJECTED
      );
  },
});

export default contactsSlice.reducer;
