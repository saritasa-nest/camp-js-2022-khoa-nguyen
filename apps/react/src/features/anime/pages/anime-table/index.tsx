import { Container, Grid } from '@mui/material';

import { useEffect } from 'react';

import { useAppDispatch } from '@js-camp/react/store/store';

import { getAnimeList } from '@js-camp/react/store/anime/dispatchers';

import { useSelector } from 'react-redux';

import { selectAmineList } from '@js-camp/react/store/anime/selectors';

import { DefaultLayout } from '../../../../layout';

import { Card } from '../../../../components';

export const AnimeTablePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const animeList = useSelector(selectAmineList);
  console.log(animeList);

  useEffect(() => {
    dispatch(getAnimeList(''));
  }, []);
  return <DefaultLayout>
    <Container>
      <Grid container justifyContent="center" spacing={5}>
        <Grid item xs={3}>
          <Card>Test</Card>
        </Grid>
        <Grid item xs={9}>
          <Card>Test2</Card>
        </Grid>
      </Grid>
    </Container>

  </DefaultLayout>;
};
