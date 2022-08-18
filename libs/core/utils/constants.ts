import { SortTitle, SortValue } from '../models';

/** Options of type interface. */
interface SortingOptions {

  /** Title of options. */
  readonly title: SortTitle;

  /** Value of options. */
  readonly value: SortValue;
}

export const SORT_OPTIONS: readonly SortingOptions[] = [
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
