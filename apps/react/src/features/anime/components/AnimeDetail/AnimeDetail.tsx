import { AnimeQueryUrl } from '@js-camp/core/dtos/animeQuery.dto';
import { getAnimeDetail } from '@js-camp/react/store/animeDetail/dispatchers';
import {
  selectAnimeDetailById,
  selectIsAnimeDetailLoading,
} from '@js-camp/react/store/animeDetail/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Chip, List, ListItem, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { FC, useEffect } from 'react';

import { selectGenres } from '@js-camp/react/store/genre/selectors';

import { selectStudios } from '@js-camp/react/store/studios/selectors';

import { IMAGES } from '../../../../assets';
import { Loading } from '../../../../components';
import { useQueryParam } from '../../../../hooks';

import style from './AnimeDetail.module.css';

const getText = (text: string | undefined): string => {
  if (text == null || text === '') {
    return '--';
  }
  return text;
};

const INITIAL_ANIME_ID = -1;

export const AnimeDetail: FC = () => {
  const { queryMethods } = useQueryParam<AnimeQueryUrl>();
  const dispatch = useAppDispatch();

  const currentAnimeId = queryMethods.get('animeId');

  const isLoading = useAppSelector(selectIsAnimeDetailLoading);

  const animeInfo = useAppSelector(state =>
    selectAnimeDetailById(state, currentAnimeId ?? INITIAL_ANIME_ID));

  const genres = useAppSelector(selectGenres);
  const studios = useAppSelector(selectStudios);

  useEffect(() => {
    dispatch(getAnimeDetail(Number(currentAnimeId)));
  }, [currentAnimeId]);

  if (currentAnimeId == null) {
    return <div>Select anime to view its information.</div>;
  }

  if (isLoading) {
    return (
      <Container
        sx={{
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loading isBackdropLoading={false} />;
      </Container>
    );
  }

  if (animeInfo == null) {
    return <div>There is no anime with the id on the search param.</div>;
  }

  return (
    <div className={style['anime-detail']}>
      <img
        src={animeInfo?.image ?? IMAGES.FallbackAvatar}
        className={style['anime-detail__image']}
      />
      <Typography>
        <strong>English name:</strong> {getText(animeInfo?.titleEnglish)}
      </Typography>
      <Typography>
        <strong>Japanese name:</strong> {getText(animeInfo?.titleJapan)}
      </Typography>
      <Typography>
        <strong>Status:</strong> {getText(animeInfo?.status)}
      </Typography>
      <Typography>
        <strong>Type:</strong> {getText(animeInfo?.type)}
      </Typography>
      <Typography>
        <strong>Synopsis:</strong> {getText(animeInfo?.synopsis)}
      </Typography>
      <Typography>
        <strong>Start date:</strong>{' '}
        {getText(animeInfo?.aired.start?.toDateString())}
      </Typography>
      <Typography>
        <strong>End date:</strong>{' '}
        {getText(animeInfo?.aired.end?.toDateString())}
      </Typography>

      <List className={style['anime-detail__list']}>
        <strong>Genres: </strong>
        {animeInfo.genresIds.map(item => (
          <ListItem className={style['anime-detail__list-item']} key={item}>
            <Chip className={style['anime-detail__chip']} label={genres.find(genre => genre.id === item)?.name} />
          </ListItem>
        ))}
      </List>

      <List className={style['anime-detail__list']}>
        <strong>Studios: </strong>
        {animeInfo.studioIds.map(item => (
          <ListItem className={style['anime-detail__list-item']} key={item}>
            <Chip className={style['anime-detail__chip']} label={studios.find(studio => studio.id === item)?.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
