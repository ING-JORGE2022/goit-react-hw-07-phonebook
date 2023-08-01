import { memo } from 'react';
import './ContactList.css';
import { useDispatch, useSelector } from 'react-redux';
import { delContact } from 'redux/operations';
import { selectContacts, selectFilter } from 'redux/selectors';

function ContactList() {
  const { items: contacts } = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onClickFunc = e => {
    dispatch(delContact(e.target.closest('li').dataset.id));
  };

  const filterFunc = () => {
    console.log(contacts, filter);
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filterMass = filterFunc();

  return (
    <ul className="list">
      {filterMass.map(({ name, id, phone }) => (
        <li key={id} data-id={id}>
          <span className="name">{name}:</span> <span>{phone}</span>
          <button className="buttonList" type="button" onClick={onClickFunc}>
            delete
          </button>
        </li>
      ))}

      {!filterMass[0] && <li>Not found!</li>}
    </ul>
  );
}

export default memo(ContactList);
