import PropTypes from 'prop-types';

import { MoreBtn } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <MoreBtn type="button" onClick={onClick}>
      Load More
    </MoreBtn>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
