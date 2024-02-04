import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLbl,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <SearchForm
        onSubmit={e => {
          e.preventDefault();
          const newQuery = e.target.elements.query.value.trim().toLowerCase();

          if (newQuery === '') {
            return toast.warn('Give me some query to search');
          }

          return onSubmit(newQuery);
        }}
      >
        <SearchFormBtn type="submit">
          <SearchFormBtnLbl />
        </SearchFormBtn>

        <SearchFormInput
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
