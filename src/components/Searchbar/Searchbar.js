import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

const Searchbar = ({ onChangeForm }) => {
  const [search, setSearch] = useState('');

  const handleRequest = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    onChangeForm(search);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          onChange={handleRequest}
        />
      </form>
    </header>
  );
};

Searchbar.protoType = {
  onChangeForm: PropTypes.func.isRequired,
};

export default Searchbar;
