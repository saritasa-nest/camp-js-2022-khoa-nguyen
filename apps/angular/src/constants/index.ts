import { environment } from '../environments/environment';

export const BASE_URL = environment.apiUrl;
export const API_KEY = environment.apiKey;

export const DEFAULT_LIMIT = 25;
export const DEFAULT_OFFSET = 0;
export const DEFAULT_ACTIVE_PAGE = 1;
export const DEFAULT_SEARCH = '';
export const DEFAULT_TOTAL_PAGE = 0;
export const FIRST_PAGE = 1;
export const PAGE_RANGE = 5;
export const PAGE_STEP = 2;
