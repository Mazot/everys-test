import { forward, sample, split } from "effector";
import { 
  $isFetched,
  $searchCount, 
  $searchInput, 
  $searchResult, 
  $selectedPage, 
  $showError, 
  fetchStock, 
  fetchStockFx,
  resetEvent, 
  setPageNumber, 
  setSearchCount, 
  setSearchInput,
  setSearchResult,
  setShowError,
} from ".";
import { StockRequestError, stockRequest } from "../../../utils/api/api";

$searchInput.reset(resetEvent);
$searchResult.reset(resetEvent);
$searchCount.reset(resetEvent);
$selectedPage.reset(resetEvent);
$showError.reset(resetEvent);

fetchStockFx.use(async (params) => {
  return await stockRequest(params);
});

sample({
  clock: fetchStockFx.fail, 
  fn: () => true,
  target: $showError,
});

forward({
  from: setShowError,
  to: $showError
});

forward({
  from: fetchStockFx.pending, 
  to: $isFetched
});

forward({
  from: setSearchInput,
  to: $searchInput,
});

forward({
  from: setSearchCount,
  to: $searchCount,
});

split({
  source: fetchStockFx.doneData,
  match: {
    first: (data) => !!data?.result,
    second: (data) => !!(data as unknown as StockRequestError)?.errors,
  },
  cases: {
    first: setSearchResult,
    second: setShowError
  },
});

sample({
  clock: setSearchResult,
  fn: (data) => (data.result),
  target: $searchResult,
});

forward({
  from: setPageNumber,
  to: $selectedPage,
});

sample({
  clock: fetchStock,
  source: [$searchInput, $selectedPage, $searchCount],
  fn: ([searchInput, selectedPage, searchCount]: [string, number, number]) => {
    return {
      Skip: selectedPage * searchCount,
      Take: searchCount,
      Filter: searchInput || '',
      // Expand: string;
      // OrderBy: string;
      // OrderDirection: string;
    };
  },
  target: fetchStockFx,
});