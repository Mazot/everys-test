import * as React from 'react';
import { Button } from '../Button/Button';

import './pageSection.scss';

type IPageSectionProps = {
  selectedPageNumber: number;
  totalPageCount: number;
  onPrevClick?: () => void;
  onNextClick?: () => void;
};

export const PageSection: React.FC<IPageSectionProps> = (props) => {

  return (
    <div className='pageSection_container'>
      <div>Страница:&#160;{props.selectedPageNumber}&#160;из&#160;{props.totalPageCount}</div>
      <div className='pageSection_buttons_container'>
        <Button 
          title='Предыдущая'
          disabled={props.selectedPageNumber === 1}
          onClick={props.selectedPageNumber !== 1 ? props.onPrevClick : null} 
        />
        <Button 
          title='Следующая'
          disabled={props.selectedPageNumber === props.totalPageCount}
          onClick={props.selectedPageNumber === props.totalPageCount ? null : props.onNextClick} 
        />
      </div>
    </div>
  );
};