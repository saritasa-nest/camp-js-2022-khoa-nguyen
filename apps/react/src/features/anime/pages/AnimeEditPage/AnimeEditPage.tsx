import { AnimeEdit } from '@js-camp/core/models/animeEdit';
import { getAnimeDetail } from '@js-camp/react/store/anime/dispatchers';
import {
  selectAnimeDetailById,
  selectIsAnimeDetailLoading,
} from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AnimeEditCreateForm } from '../../components/AnimeEditCreateForm';
import {
  AnimeDetailLoading,
  AnimeDetailNoData,
} from '../AnimeDetailPage/AnimeOtherLayout';

const INITIAL_ANIME_ID = '-1';

export const AnimeEditPage: FC = () => {
  const { id: currentAnimeId } = useParams();
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsAnimeDetailLoading);
  const animeInfo = useAppSelector(state =>
    selectAnimeDetailById(state, currentAnimeId ?? INITIAL_ANIME_ID));

  useEffect(() => {
    if (currentAnimeId != null && currentAnimeId !== INITIAL_ANIME_ID) {
      dispatch(getAnimeDetail({ id: Number(currentAnimeId), type: 'edit' }));
    }
  }, [currentAnimeId]);

  if (isLoading) {
    return <AnimeDetailLoading />;
  }

  if (animeInfo == null) {
    return <AnimeDetailNoData />;
  }

  return (
    <div>
      <AnimeEditCreateForm data={animeInfo as AnimeEdit}/>
    </div>
  );
};
