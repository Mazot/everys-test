const baseUrl = process.env.CLIENT_BASE_URL;
const apiLogin = process.env.API_LOGIN
const apiPassword = process.env.API_PASSWORD;

const createQueryString = (params: Record<string, string | number | boolean> = {}, url: string = ''): string => {
  const paramNames = Object.keys(params);

  if (!paramNames.length) {
    return url;
  }

  const additionalGetParams: string[] = [];

  paramNames.forEach((param) => {
    additionalGetParams.push(param + '=' + encodeURIComponent(params[param]));
  });

  url += url.includes('?') ? '&' : '?';
  url += additionalGetParams.join('&');

  return url;
};

const fetchGetWrapper = async (url: string) => {
  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(apiLogin + ":" + apiPassword));

  return fetch(url, {
    method: 'GET',
    headers,
  });
};


type StockItem = {
  code: string;
  title: string;
  manufacturer: string;
  description: string;
  price: string;
  stock: number;
};

export type StockRequestResult = {
  totalItems: number;
  items: StockItem[];
};  

export type StockRequestResolve = {
  requestId: string;
  status: string;
  result: StockRequestResult;
};

export type StockRequestError = {
  requestId: string;
  status: string;
  errors: string;
};

export type StockRequestParams = {
  Skip: number;
  Take: number;
  Filter: string;
  Expand?: string;
  OrderBy?: string;
  OrderDirection?: string;
};

export const stockRequest = async (params: StockRequestParams): Promise<StockRequestResolve> => {
  const stockUrl = createQueryString(params, `${baseUrl}/v1/Stock`);

  try {
    const response = await fetchGetWrapper(stockUrl);
    return response.json() as Promise<StockRequestResolve>;
  } catch (error) {
    console.log('eEROR', error)
    throw error;
  }
};