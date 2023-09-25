import * as React from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

import './searchBar.scss';

type ISearchBarProps = {
  onSearchClick: () => void;
  onSearchInputChange: (inp: string) => void;
  onSearchCountChange: (inp: number) => void;
  defaultSearchCount: number;
};

export const SearchBar: React.FC<ISearchBarProps> = (props) => {

  return (
    <div 
      className='searchBar_container'
    >
      <div className='searchBar_input_side_container'>
        <div className='searchBar_textInput_container'>
          <Input 
            type='text' 
            title='Поиск' 
            placeholder='Введите строку поиска'
            onChange={props.onSearchInputChange}
          />
        </div>
      </div>
      <div className='searchBar_button_container'>
        <div className='searchBar_countInput_container'>
          <Input
            type='number' 
            titlePosition='center' 
            title='Кол-во' 
            onChange={props.onSearchCountChange}
            defaultValue={`${props.defaultSearchCount}`} 
          />
        </div>
        <Button 
          title='Поиск'
          onClick={props.onSearchClick}
        />
      </div>
    </div>
  );
};