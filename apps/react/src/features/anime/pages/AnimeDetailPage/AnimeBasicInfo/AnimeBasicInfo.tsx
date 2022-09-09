import { AnimeDetail } from '@js-camp/core/models';
import { Typography } from '@mui/material';
import { FC } from 'react';

import { TextService } from '../../../../../api/services/textService';

interface Props {

  /** Anime info. */
  readonly animeInfo: AnimeDetail;
}

export const AnimeBasicInfo: FC<Props> = ({ animeInfo }) => (
  <>
    <Typography>
      <strong>English name:</strong>{' '}
      {TextService.replaceEmptyValue(animeInfo?.titleEnglish)}
    </Typography>
    <Typography>
      <strong>Japanese name:</strong> {TextService.replaceEmptyValue(animeInfo?.titleJapan)}
    </Typography>
    <Typography>
      <strong>Status:</strong> {TextService.replaceEmptyValue(animeInfo?.status)}
    </Typography>
    <Typography>
      <strong>Type:</strong> {TextService.replaceEmptyValue(animeInfo?.type)}
    </Typography>
    <Typography>
      <strong>Synopsis:</strong> {TextService.replaceEmptyValue(animeInfo?.synopsis)}
    </Typography>
    <Typography>
      <strong>Start date:</strong>{' '}
      {TextService.replaceEmptyValue(animeInfo?.aired.start?.toDateString())}
    </Typography>
    <Typography>
      <strong>End date:</strong>{' '}
      {TextService.replaceEmptyValue(animeInfo?.aired.end?.toDateString())}
    </Typography>

    <Typography>
      <strong>Airing:</strong>{' '}
      {TextService.replaceEmptyValue(animeInfo?.isAiring ? 'Yes' : 'No')}
    </Typography>
  </>
);
