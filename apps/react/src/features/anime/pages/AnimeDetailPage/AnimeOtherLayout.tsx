import { Container } from '@mui/material';
import { FC } from 'react';

import { Loading } from '../../../../components';

import style from './AnimeDetail.module.css';

export const AnimeDetailNoData: FC = () => (
  <div className={style['anime-detail']}>
    There is no anime with the id on url.
  </div>
);

export const AnimeDetailLoading: FC = () => (
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

export const AnimeDetailRequireSelect: FC = () => (
  <div className={style['anime-detail']}>
    Select anime to view its information.
  </div>
);
