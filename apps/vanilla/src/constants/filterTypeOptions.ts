/* eslint-disable @typescript-eslint/naming-convention */

/** Options of type interface. */
interface FilterType {

  /** Title of options. */
  title: string;

  /** Value of options. */
  value: Type;
}

import { Type } from '@js-camp/core/enum';

export const FILTER_TYPE_OPTIONS: FilterType[] = [
  {
    title: 'Default',
    value: Type.Default,
  },
  {
    title: 'Movie',
    value: Type.Movie,
  },
  {
    title: 'Music',
    value: Type.Music,
  },
  {
    title: 'Ona',
    value: Type.Ona,
  },
  {
    title: 'Ova',
    value: Type.Ova,
  },
  {
    title: 'Special',
    value: Type.Special,
  },
  {
    title: 'TV',
    value: Type.Tv,
  },
];
