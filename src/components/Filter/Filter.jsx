import './Filter.css';
import { nanoid } from 'nanoid';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';

const fieldIdFilter = nanoid();

function Filter() {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'filter':
        dispatch(changeFilter(value));
        break;

      default:
        console.warn('Чекни поле');
        break;
    }
  };

  return (
    <>
      <label className="leb" htmlFor={fieldIdFilter}>
        Find contacts by name
      </label>
      <input
        className="filter"
        type="text"
        name="filter"
        value={filter}
        id={fieldIdFilter}
        onChange={onChange}
      />
    </>
  );
}

export default memo(Filter);
