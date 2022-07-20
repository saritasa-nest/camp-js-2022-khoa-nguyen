import { TypeModel } from '@js-camp/core/models/anime';

/** Options of type interface. */
interface FilterType {

  /** Title of options. */
  readonly title: string;

  /** Value of options. */
  readonly value: TypeModel;
}

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
