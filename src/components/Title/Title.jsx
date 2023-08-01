import { memo } from 'react';
import './Title.css';
import PropTypes from 'prop-types';

const Title = ({ text }) => {
  return <h2 className="title">{text}</h2>;
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default memo(Title);
