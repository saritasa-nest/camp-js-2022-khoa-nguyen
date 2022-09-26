import { selectGenres } from '@js-camp/react/store/genre/selectors';
import {
  selectIsCreateGenreLoading,
  selectIsGenresListLoading,
  selectListGenres,
} from '@js-camp/react/store/genreList/selectors';
import { useAppSelector } from '@js-camp/react/store/store';
import { selectStudios } from '@js-camp/react/store/studios/selectors';
import {
  selectIsCreateStudioLoading,
  selectIsStudiosListLoading,
  selectListStudios,
} from '@js-camp/react/store/studiosList/selectors';

export const useAnimeFormSelectors = () => {
  const isCreateGenreLoading = useAppSelector(selectIsCreateGenreLoading);
  const isGenreListLoading = useAppSelector(selectIsGenresListLoading);
  const genres = useAppSelector(selectGenres);
  const genresList = useAppSelector(selectListGenres);

  const isCreateStudioLoading = useAppSelector(selectIsCreateStudioLoading);
  const studios = useAppSelector(selectStudios);
  const isStudiosListLoading = useAppSelector(selectIsStudiosListLoading);
  const studiosList = useAppSelector(selectListStudios);
  const animeFormData = {
    isCreateGenreLoading,
    isGenreListLoading,
    genres,
    genresList,
    isCreateStudioLoading,
    studios,
    isStudiosListLoading,
    studiosList,
  } as const;
  return animeFormData;
};
