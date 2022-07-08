/* eslint-disable @typescript-eslint/naming-convention */

import { Sort } from '../interface/sortInterface';

const SORT_TITLES = {
  TITLE_ENG: 'Title Eng',
  AIRED_START_DATE: 'Aired start day',
  STATUS: 'Status',
};

const SORT_VALUE = {
  TITLE_ENG: 'title_eng',
  AIRED_START_DATE: 'aired__startswith',
  STATUS: 'status',
};

export const SORT_OPTIONS: Sort[] = [
  {
    title: SORT_TITLES.TITLE_ENG,
    value: SORT_VALUE.TITLE_ENG,
  },
  {
    title: SORT_TITLES.AIRED_START_DATE,
    value: SORT_VALUE.AIRED_START_DATE,
  },
  {
    title: SORT_TITLES.STATUS,
    value: SORT_VALUE.STATUS,
  },
];
