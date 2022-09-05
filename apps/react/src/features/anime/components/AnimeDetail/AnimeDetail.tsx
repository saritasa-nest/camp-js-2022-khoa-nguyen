import { AnimeQueryUrl } from '@js-camp/core/dtos/animeQuery.dto';
import { getAnimeDetail } from '@js-camp/react/store/animeDetail/dispatchers';
import {
  selectAnimeDetailById,
  selectIsAnimeDetailLoading,
} from '@js-camp/react/store/animeDetail/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Typography } from '@mui/material';

import { FC, useEffect } from 'react';

import { Container } from '@mui/system';

import { Loading } from '../../../../components';

import { IMAGES } from '../../../../assets';

import { useQueryParam } from '../../../../hooks';

import style from './AnimeDetail.module.css';

const getText = (text: string | undefined): string => {
  if (text == null || text === '') {
    return '--';
  }
  return text;
};

export const AnimeDetail: FC = () => {
  const { queryMethods } = useQueryParam<AnimeQueryUrl>();
  const dispatch = useAppDispatch();
  const currentAnimeId = queryMethods.get('animeId');

  if (currentAnimeId == null) {
    return <div>Select anime to view its information.</div>;
  }
  useEffect(() => {
    dispatch(getAnimeDetail(Number(currentAnimeId)));
  }, [currentAnimeId]);

  const animeInfo = useAppSelector(state =>
    selectAnimeDetailById(state, currentAnimeId));
  const isLoading = useAppSelector(selectIsAnimeDetailLoading);

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Loading isBackdropLoading={false} />;
      </Container>
    );
  }

  if (animeInfo == null) {
    return <div>There is no anime with the id on the search param.</div>;
  }

  return (
    <div className={style['anime-detail']}>
      <div className={style['anime-detail__thumb-wrapper']}>
        <img
          src={animeInfo?.image ?? IMAGES.FallbackAvatar}
          className={style['anime-detail__image']}
        />
      </div>
      <Typography><strong>English name:</strong> {getText(animeInfo?.titleEnglish)}</Typography>
      <Typography><strong>Japanese name:</strong> {getText(animeInfo?.titleJapan)}</Typography>
      <Typography><strong>Status:</strong> {getText(animeInfo?.status)}</Typography>
      <Typography><strong>Type:</strong> {getText(animeInfo?.type)}</Typography>
      <Typography><strong>Synopsis:</strong> {getText(animeInfo?.synopsis)}</Typography>
      <Typography><strong>Start date:</strong> {getText(animeInfo?.aired.start?.toDateString())}</Typography>
      <Typography><strong>End date:</strong> {getText(animeInfo?.aired.end?.toDateString())}</Typography>
    </div>
  );
};
