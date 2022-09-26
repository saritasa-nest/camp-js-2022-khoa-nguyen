import { StatusModel, TypeModel } from '@js-camp/core/models';
import { Season, Source, Rating } from '@js-camp/core/models/animeEdit';
import { FC } from 'react';

import { AppSelect, FormInputItem } from '../../../../../components';

export const AnimeFormSimpleInputs: FC = () => (
  <>
    <FormInputItem label={'Title English'} name={'titleEnglish'} />
    <FormInputItem label={'Title Japanese'} name={'titleJapan'} />
    <FormInputItem label={'Trailer Youtube ID'} name={'trailerYoutubeId'} />
    <FormInputItem
      as={AppSelect}
      name="type"
      list={Object.values(TypeModel).map(item => ({ value: item }))}
      label={'Type'}
    />
    <FormInputItem
      as={AppSelect}
      name="status"
      list={Object.values(StatusModel).map(item => ({ value: item }))}
      label={'Status'}
    />
    <FormInputItem
      as={AppSelect}
      name="source"
      list={Object.values(Source).map(item => ({ value: item }))}
      label={'Source'}
    />

    <FormInputItem
      as={AppSelect}
      name="rating"
      list={Object.values(Rating).map(item => ({ value: item }))}
      label={'Rating'}
    />
    <FormInputItem
      as={AppSelect}
      name="season"
      list={Object.values(Season).map(item => ({ value: item }))}
      label={'Season'}
    />
  </>
);
