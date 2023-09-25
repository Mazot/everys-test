import {
  createEffect,
  createEvent,
  createStore,
} from 'effector';

import { StockRequestParams, StockRequestResolve, StockRequestResult } from '../../../utils/api/api';

export const resetEvent = createEvent();

export const $searchInput = createStore<string>('');
export const $searchCount = createStore<number>(3);
export const $searchResult = createStore<StockRequestResult>(null);
export const $selectedPage = createStore<number>(1);
export const $isFetched = createStore<boolean>(false);
export const $showError = createStore<boolean>(false);

export const setShowError = createEvent<boolean>();
export const setSearchInput = createEvent<string>();
export const setSearchCount = createEvent<number>();
export const setPageNumber = createEvent<number>();
export const setSearchResult = createEvent<StockRequestResolve>(null);


export const fetchStock = createEvent();

export const fetchStockFx = createEffect<StockRequestParams, StockRequestResolve>();