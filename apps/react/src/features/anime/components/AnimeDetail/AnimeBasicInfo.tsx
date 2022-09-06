import { AnimeDetail } from '@js-camp/core/models';
import { Typography } from '@mui/material';
import { FC } from 'react';

const getText = (text: string | undefined): string => {
  if (text == null || text === '') {
    return '--';
  }
  return text;
};

interface Props {

  /** Anime info. */
  readonly animeInfo: AnimeDetail;
}

export const AnimeBasicInfo: FC<Props> = ({ animeInfo }) => (
  <>
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
      <strong>End date:</strong> {getText(animeInfo?.aired.end?.toDateString())}
    </Typography>
  </>
);
