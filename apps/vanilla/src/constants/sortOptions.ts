/* eslint-disable @typescript-eslint/naming-convention */

import { ISort } from '../interface/sortInterface';

const sortTitles = {
  TITLE_ENG: 'Title Eng',
  AIRED_START_DATE: 'Aired start day',
  STATUS: 'Status',
};

const sortAPI = {
  TITLE_ENG: 'title_eng',
  AIRED_START_DATE: 'aired__startswith',
  STATUS: 'status',
};

export const sortOptions: ISort[] = [
  {
    title: sortTitles.TITLE_ENG,
    api: sortAPI.TITLE_ENG,
  },
  {
    title: sortTitles.AIRED_START_DATE,
    api: sortAPI.AIRED_START_DATE,
  },
  {
    title: sortTitles.STATUS,
    api: sortAPI.STATUS,
  },
];
