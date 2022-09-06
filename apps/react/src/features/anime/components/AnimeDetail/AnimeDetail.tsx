import { AnimeDetail as AnimeDetailModel } from '@js-camp/core/models';
import { getAnimeDetail } from '@js-camp/react/store/anime/dispatchers';
import {
  selectAnimeDetailById,
  selectIsAnimeDetailLoading,
} from '@js-camp/react/store/anime/selectors';
import { selectGenres } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { selectStudios } from '@js-camp/react/store/studios/selectors';
import { Button, Chip, List, ListItem, Modal } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IMAGES } from '../../../../assets';

import { AnimeBasicInfo } from './AnimeBasicInfo';
import style from './AnimeDetail.module.css';
import {
  AnimeDetailLoading,
  AnimeDetailNoData,
  AnimeDetailRequireSelect,
} from './AnimeOtherLayout';

interface ModalOption {

  /** Whether modal is open or not. */
  readonly isOpenModal: boolean;

  /** Content of modal. */
  readonly content: ReactNode;
}

const INITIAL_ANIME_ID = '-1';

const INITIAL_MODAL_OPTION: ModalOption = {
  isOpenModal: false,
  content: null,
};

export const AnimeDetail: FC = () => {
  const { id: currentAnimeId } = useParams();
  const dispatch = useAppDispatch();
  const [modalOption, setModalOption] =
    useState<ModalOption>(INITIAL_MODAL_OPTION);

  const handleCloseModel = () =>
    setModalOption(prev => ({ ...prev, isOpenModal: false }));

  const isLoading = useAppSelector(selectIsAnimeDetailLoading);
  const animeInfo = useAppSelector(state =>
    selectAnimeDetailById(state, currentAnimeId ?? INITIAL_ANIME_ID));
  const genres = useAppSelector(selectGenres);
  const studios = useAppSelector(selectStudios);

  const handleOpenImage =
    (url: string, animeTitle: AnimeDetailModel['titleEnglish']) => () => {
      setModalOption({
        isOpenModal: true,
        content: <img src={url} alt={animeTitle} />,
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

  useEffect(() => {
    if (currentAnimeId != null && currentAnimeId !== INITIAL_ANIME_ID) {
      dispatch(getAnimeDetail(Number(currentAnimeId)));
    }
  }, [currentAnimeId]);

  if (currentAnimeId == null) {
    return <AnimeDetailRequireSelect />;
  }

  if (isLoading) {
    return <AnimeDetailLoading />;
  }

  if (animeInfo == null) {
    return <AnimeDetailNoData />;
  }

  const animeImage = animeInfo.image ?? IMAGES.FallbackAvatar;
  return (
    <div className={style['anime-detail']}>
      <div className={style['anime-detail__image-wrapper']}>
        <img
          onClick={handleOpenImage(animeImage, animeInfo.titleEnglish)}
          src={animeImage}
          alt={animeInfo.titleEnglish}
          role={'button'}
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
