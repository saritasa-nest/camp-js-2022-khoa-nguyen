import { getAnimeList, getNextAnimeList } from '@js-camp/react/store/anime/dispatchers';
import {
  selectAmineList,
  selectIsAnimeLoading,
  selectNextPage,
} from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';

import { FC, memo, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { LoadingComponent } from '../../../../components';

import { AnimeItem } from '../AnimeItem';

import style from './AnimeInfinitiveScroll.module.css';

const option = {
  root: null,
  rootMargin: '20px',
  threshold: 0.2,
};

export const AnimeInfinitiveScrollInner: FC = () => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isLoading = useAppSelector(selectIsAnimeLoading);
  const dispatch = useAppDispatch();
  const nextPage = useAppSelector(selectNextPage);
  const animeList = useSelector(selectAmineList);

  useEffect(() => {
    dispatch(getAnimeList(''));
  }, []);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && nextPage) {
        dispatch(getNextAnimeList(nextPage));
      }
    },
    [nextPage],
  );

  useEffect(() => {

    const observer = new IntersectionObserver(handleObserver, option);
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);
  if (isLoading) {
    return <LoadingComponent/>;
  }
  if (animeList.length === 0) {
    return <div>There is no result</div>;
  }
  return (
    <>
      {animeList?.map((item, index) => (
        <div key={index} ref={itemRef} className={style['anime-item']}>
          <AnimeItem data={item} />
        </div>
      ))}
      <div>{nextPage && <LoadingComponent />}</div>
    </>
  );
};

export const AnimeInfinitiveScroll = memo(AnimeInfinitiveScrollInner);
