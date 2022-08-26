import { getAnimeList, getNextAnimeList } from '@js-camp/react/store/anime/dispatchers';
import {
  selectAmineList,
  selectIsAnimeLoading,
  selectNextPage,
} from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { ListItem } from '@mui/material';

import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useSelector } from 'react-redux';

import { Loading, LoadingComponent } from '../../../../components';

import { AnimeItem } from '../AnimeItem';

import style from './AnimeSidebar.module.css';

export const AnimeSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useSelector(selectAmineList);
  const isLoading = useAppSelector(selectIsAnimeLoading);
  const nextPage = useAppSelector(selectNextPage);

  const itemRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && nextPage && !isLoading) {
        dispatch(getNextAnimeList(nextPage));
      }
    },
    [nextPage],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.2,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  useEffect(() => {
    dispatch(getAnimeList(''));
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <ListItem className={style['anime-sidebar']}>
      {animeList?.map((item, index) => (
        <div ref={itemRef}>
          <AnimeItem key={index} data={item} />
        </div>
      ))}
      <div>
        {
          nextPage && <LoadingComponent />
        }
      </div>
    </ListItem>
  );
};
