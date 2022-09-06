import { AnimeQueryUrl } from '@js-camp/core/dtos/animeQuery.dto';
import { getAnimeDetail } from '@js-camp/react/store/animeDetail/dispatchers';
import {
  selectAnimeDetailById,
  selectIsAnimeDetailLoading,
} from '@js-camp/react/store/animeDetail/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { Button, Chip, List, ListItem, Modal } from '@mui/material';
import { Container } from '@mui/system';
import { FC, ReactNode, useEffect, useState } from 'react';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { selectStudios } from '@js-camp/react/store/studios/selectors';
import { AnimeDetail as AnimeDetailModel } from '@js-camp/core/models';

import { IMAGES } from '../../../../assets';
import { Loading } from '../../../../components';
import { useQueryParam } from '../../../../hooks';

import { AnimeBasicInfo } from './AnimeBasicInfo';
import style from './AnimeDetail.module.css';

interface ModalOption {

  /** Whether modal is open or not. */
  readonly isOpenModal: boolean;

  /** Content of modal. */
  readonly content: ReactNode;
}

const INITIAL_ANIME_ID = -1;

const INITIAL_MODAL_OPTION: ModalOption = {
  isOpenModal: false,
  content: null,
};

export const AnimeDetail: FC = () => {
  const { queryMethods } = useQueryParam<AnimeQueryUrl>();
  const dispatch = useAppDispatch();
  const [modalOption, setModalOption] =
    useState<ModalOption>(INITIAL_MODAL_OPTION);
  const handleCloseModel = () =>
    setModalOption(prev => ({ ...prev, isOpenModal: false }));

  const handleOpenImage = () => {
    setModalOption({
      isOpenModal: true,
      content: <img src={animeInfo?.image ?? IMAGES.FallbackAvatar} />,
    });
  };

  const handleOpenTrailer =
    (trailerId: NonNullable<AnimeDetailModel['trailerYoutubeId']>) => () => {
      const url = 'https://www.youtube.com/embed/';
      setModalOption({
        isOpenModal: true,
        content: (
          <iframe
            allowFullScreen
            className={style['anime-detail__iframe']}
            src={`${url}${trailerId}`}
          />
        ),
      });
    };

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
    return <div className={style['anime-detail']}>Select anime to view its information.</div>;
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
    return <div className={style['anime-detail']}>There is no anime with the id on the search param.</div>;
  }

  return (
    <div className={style['anime-detail']}>
      <div className={style['anime-detail__image-wrapper']}>
        <img
          onClick={handleOpenImage}
          src={animeInfo?.image ?? IMAGES.FallbackAvatar}
          className={style['anime-detail__image']}
        />
        {animeInfo.trailerYoutubeId && (
          <Button
            variant="contained"
            onClick={handleOpenTrailer(animeInfo.trailerYoutubeId)}
          >
            Watch trailer
          </Button>
        )}
      </div>
      <AnimeBasicInfo animeInfo={animeInfo} />
      <List className={style['anime-detail__list']}>
        <strong>Genres: </strong>
        {animeInfo.genresIds.length === 0 && '--'}
        {animeInfo.genresIds.length > 0 &&
          animeInfo.genresIds.map(item => (
            <ListItem className={style['anime-detail__list-item']} key={item}>
              <Chip
                className={style['anime-detail__chip']}
                label={genres.find(genre => genre.id === item)?.name}
              />
            </ListItem>
          ))}
      </List>

      <List className={style['anime-detail__list']}>
        <strong>Studios: </strong>
        {animeInfo.studioIds.length === 0 && '--'}
        {animeInfo.studioIds.length > 0 &&
          animeInfo.studioIds.map(item => (
            <ListItem className={style['anime-detail__list-item']} key={item}>
              <Chip
                className={style['anime-detail__chip']}
                label={studios.find(studio => studio.id === item)?.name}
              />
            </ListItem>
          ))}
      </List>

      <Modal open={modalOption.isOpenModal} onClose={handleCloseModel}>
        <>{modalOption.content}</>
      </Modal>
    </div>
  );
};
