import * as React from 'react';

import './table.scss';

type ITableProps = { 
  titles: string[];
  values: (string | number)[][];
};

export const Table: React.FC<ITableProps> = (props) => {

  return (
    <table className="table">
      <thead>
        <tr>
          {props.titles.map((title, index) => (
            <th key={`${title}_${index}`}>
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.values.map((row, index) => (
          <tr key={`${row[0]}_${index}`}>
            {row.map((value, index) => (
              <td key={`${value}_${index}`}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};