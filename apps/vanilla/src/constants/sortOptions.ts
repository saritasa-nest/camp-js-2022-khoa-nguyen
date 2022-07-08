/* eslint-disable @typescript-eslint/naming-convention */

import { SortTitle, SortValue } from '@js-camp/core/enum';

import { Sort } from '../interface/sortInterface';

export const SORT_OPTIONS: Sort[] = [
  {
    title: SortTitle.TitleEnglish,
    value: SortValue.TitleEnglish,
  },
  {
    title: SortTitle.AiredStartDate,
    value: SortValue.AiredStartDate,
  },
  {
    title: SortTitle.Status,
    value: SortValue.Status,
  },
];
