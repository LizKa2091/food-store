import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar: FC = () => {
   const [searchInput, setSearchInput] = useState<string>('');

   const navigate = useNavigate();

   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
   };

   const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (searchInput.trim().length > 0) {
         navigate(`/catalog/${searchInput}`);
      }
   };

   return (
      <form onSubmit={handleFormSubmit} className='nav__form'>
         <input type="text" value={searchInput} onChange={handleInputChange} className="nav__input" id='nav-search' name='nav-search' placeholder='Начните поиск' />
         <button className='nav__input-button' title='Поиск'></button>
      </form>
   )
}

export default SearchBar;