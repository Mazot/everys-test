import * as React from 'react';

import './input.scss';

type IInputProps = {
  title: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  titlePosition?: 'center' | 'end' | 'flex-end' | 'flex-start' | 'self-end' | 'self-start' | 'start';
  onChange?: (inp?: string | number) => void;
  defaultValue?: string;
};

export const Input: React.FC<IInputProps> = (props) => {
  const [inputValue, setInputValue] = React.useState('');
  
  const onInputChange : React.ChangeEventHandler<HTMLInputElement> = (event) => {
    props?.onChange?.(event.target.value);
    setInputValue(event.target.value);
  };

  return (
    <div className='input_container'>
      <span 
        style={{alignSelf: props.titlePosition ?? 'auto'}} 
        className='input_title'
      >
        {props.title}
      </span>
      <input 
        className='input'
        value={inputValue || props.defaultValue || ''}
        onChange={onInputChange}
        type={props.type || 'text'}
        placeholder={props.placeholder}
      />
    </div>
  );
};