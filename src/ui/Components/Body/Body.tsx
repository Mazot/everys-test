import * as React from 'react';
import { useStore } from 'effector-react';
import { SearchBar } from '../SearchBar/SearchBar';
import { Table } from '../Table/Table';
import { Loader } from '../Loader/Loader';
import { PageSection } from '../PageSection/PageSection';
import { List } from '../List/List';
import { Alert } from '../Alert/Alert';
import { capitalizeFirstLetter } from '../../../utils/string/helpers';
import { $isFetched, $searchCount, $searchResult, $selectedPage, fetchStock, setPageNumber, setSearchCount, setSearchInput, setShowError, $showError } from '../../effector/main/index';
import { useScreenMatcher } from '../../hooks/useScreenMatcher';

import './body.scss';

export const Body: React.FC = () => {
  const selectedPage = useStore($selectedPage);
  const result = useStore($searchResult);
  const showError = useStore($showError);
  const searchCount = useStore($searchCount);
  const isFetched = useStore($isFetched);

  const isMobileWidth = useScreenMatcher();

  const onNextPage = () => {
    setPageNumber(selectedPage + 1);
    fetchStock();
  };

  const onPrevPage = () => {
    setPageNumber(selectedPage - 1);
    fetchStock();
  };

  const onSearchClick = () => {
    setPageNumber(1);
    fetchStock();
  };

  const onErrorClose = () => {
    setShowError(false);
  };
  
  React.useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div className='body_container'> 
      {isFetched && (<div className='body_loader_container'>
        <Loader />
      </div>)}
      <div className='body_content'>
        {showError && <Alert onClose={onErrorClose}/>}
        <div className='body_data_container'>
          <SearchBar 
            defaultSearchCount={searchCount}
            onSearchClick={onSearchClick}
            onSearchCountChange={setSearchCount}
            onSearchInputChange={setSearchInput}
          />

          {(result?.items && !isMobileWidth) ? (
            <Table 
              titles={Object.keys(result.items?.[0])?.map(capitalizeFirstLetter)} 
              values={result.items?.map(
                (res) => Object.values(res)
              )}
            />
          ) : null}

          {(result?.items && isMobileWidth) ? (
              <List 
                titles={Object.keys(result.items?.[0])?.map(capitalizeFirstLetter)} 
                values={result.items}
              />
          ) : null}

        </div>
        <PageSection 
          onNextClick={onNextPage}
          onPrevClick={onPrevPage}
          selectedPageNumber={selectedPage} 
          totalPageCount={result?.totalItems ? Math.floor(result?.totalItems / searchCount) : 1} 
        />
      </div>
    </div>
  );
};