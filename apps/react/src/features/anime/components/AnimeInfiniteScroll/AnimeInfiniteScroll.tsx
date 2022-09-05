import {
  getAnimeList,
  getNextAnimeList,
} from '@js-camp/react/store/anime/dispatchers';
import {
  selectAmineList,
  selectIsAnimeLoading,
  selectIsLoadingNextPage,
  selectNextPage,
} from '@js-camp/react/store/anime/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';

import { FC, memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Loading } from '../../../../components';

import { AnimeItem } from '../AnimeItem';

import style from './AnimeInfiniteScroll.module.css';

const option = {
  root: null,
  rootMargin: '30px',
  threshold: 0.2,
};

export const AnimeInfiniteScrollInner: FC = () => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isLoading = useAppSelector(selectIsAnimeLoading);
  const dispatch = useAppDispatch();
  const nextPage = useAppSelector(selectNextPage);
  const animeList = useSelector(selectAmineList);
  const isLoadingNextPage = useAppSelector(selectIsLoadingNextPage);

  useEffect(() => {
    dispatch(getAnimeList());
  }, []);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && nextPage) {
      dispatch(getNextAnimeList(nextPage));
    }
  };
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
    return <Loading isBackdropLoading={false} />;
  }

  if (animeList.length === 0) {
    return <div>There is no result</div>;
  }

  return (
    <>
      {animeList?.map((item, index) => {
        if (index === animeList.length - 1) {
          return (
            <div key={item.id} ref={itemRef} className={style['anime-item']}>
              <AnimeItem data={item} />
            </div>
          );
        }
        return <AnimeItem data={item} key={item.id} />;
      })}
      {isLoadingNextPage && <Loading isBackdropLoading={false} />}
    </>
  );
};

export const AnimeInfiniteScroll = memo(AnimeInfiniteScrollInner);
