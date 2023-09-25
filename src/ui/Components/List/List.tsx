import * as React from 'react';

import './list.scss';

type IListProps = { 
  titles: string[];
  values: {
    code: string;
    title: string;
    manufacturer: string;
    description: string;
    price: string;
    stock: number;
  }[];
};

export const List : React.FC<IListProps> = (props) => {

  return (
    <div className='list_container'>
      <div className='list_title'>
        {props.titles.map(
          (item, index) => (index === 0 ? item : ' / ' + item )
        )}
      </div>
      <ul className='list'>
        {props.values.map((item, index) => (
          <li
            className='list_item'
            key={`${item.code}_${index}`}
          >
            <div className='list_item_title_row'>
              {item.code}&#160;<b>{item.title}</b>&#160;|&#160;{item.manufacturer}
            </div>
            <div className='list_item_description_row'>
              {item.description}
            </div>
            <div className='list_item_price_stock'>
              {item.price}&#160;|&#160;{item.stock}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};