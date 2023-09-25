import * as React from 'react';

import './button.scss';

type IButtonProps = {
  title: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; 
};

export const Button: React.FC<IButtonProps> = (props) => {

  return (
    <div className='button_container'>
      <button 
        className='button'
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.title}
      </button>
    </div>
  );
};