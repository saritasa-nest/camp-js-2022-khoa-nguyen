/* eslint-disable @typescript-eslint/naming-convention */

/** Options of type interface. */
interface FilterType {

  /** Title of options. */
  readonly title: string;

  /** Value of options. */
  readonly value: TypeModel;
}

import { TypeModel } from '@js-camp/core/enum';

export const FILTER_TYPE_OPTIONS: readonly FilterType[] = [
  {
    title: 'Default',
    value: TypeModel.Default,
  },
  {
    title: 'Movie',
    value: TypeModel.Movie,
  },
  {
    title: 'Music',
    value: TypeModel.Music,
  },
  {
    title: 'Ona',
    value: TypeModel.Ona,
  },
  {
    title: 'Ova',
    value: TypeModel.Ova,
  },
  {
    title: 'Special',
    value: TypeModel.Special,
  },
  {
    title: 'TV',
    value: TypeModel.Tv,
  },
];
