import { AnimeDetail } from '@js-camp/core/models';
import { Typography } from '@mui/material';
import { FC } from 'react';

const replaceEmptyValue = (text: string | undefined): string => {
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
      <strong>English name:</strong> {replaceEmptyValue(animeInfo?.titleEnglish)}
    </Typography>
    <Typography>
      <strong>Japanese name:</strong> {replaceEmptyValue(animeInfo?.titleJapan)}
    </Typography>
    <Typography>
      <strong>Status:</strong> {replaceEmptyValue(animeInfo?.status)}
    </Typography>
    <Typography>
      <strong>Type:</strong> {replaceEmptyValue(animeInfo?.type)}
    </Typography>
    <Typography>
      <strong>Synopsis:</strong> {replaceEmptyValue(animeInfo?.synopsis)}
    </Typography>
    <Typography>
      <strong>Start date:</strong>{' '}
      {replaceEmptyValue(animeInfo?.aired.start?.toDateString())}
    </Typography>
    <Typography>
      <strong>End date:</strong> {replaceEmptyValue(animeInfo?.aired.end?.toDateString())}
    </Typography>

    <Typography>
      <strong>Airing:</strong> {replaceEmptyValue(animeInfo?.isAiring ? 'Yes' : 'No')}
    </Typography>
  </>
);
