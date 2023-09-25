import * as React from 'react';

import './alert.scss';

type IAlertProps = {
  onClose: () => void;
};

export const Alert: React.FC<IAlertProps> = (props) => {
  
  return (
    <div 
      className='alert'
      onClick={props.onClose}
    >
      <div className='alert_container'>
        <span className='alert_close'>X</span>
        <span className='alert_text'>Произошла ошибка&#160;&#160;</span> 
      </div>
    </div>
  );
};