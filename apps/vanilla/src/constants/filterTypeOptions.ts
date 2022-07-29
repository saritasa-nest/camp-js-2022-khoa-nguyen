import { TypeDto } from '@js-camp/core/dtos/anime.dto';

/** Options of type interface. */
interface FilterType {

  /** Title of options. */
  readonly title: string;

  /** Value of options. */
  readonly value: TypeDto;
}

export const FILTER_TYPE_OPTIONS: readonly FilterType[] = [
  {
    title: 'Default',
    value: TypeDto.Default,
  },
  {
    title: 'Movie',
    value: TypeDto.Movie,
  },
  {
    title: 'Music',
    value: TypeDto.Music,
  },
  {
    title: 'Ona',
    value: TypeDto.Ona,
  },
  {
    title: 'Ova',
    value: TypeDto.Ova,
  },
  {
    title: 'Special',
    value: TypeDto.Special,
  },
  {
    title: 'TV',
    value: TypeDto.Tv,
  },
];
