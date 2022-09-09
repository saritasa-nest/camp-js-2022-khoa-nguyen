import { Stack, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

import styles from './AppSelectImage.module.css';

interface Props {

  /** Image default link. */
  readonly defaultImageLink: string | null;

  /** Handle onchange image. */
  readonly onImageChange?: (image: File) => void;
}

export const AppSelectImage: FC<Props> = ({
  defaultImageLink,
  onImageChange,
}) => {
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(defaultImageLink);

  const handleUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files == null) {
      return;
    }
    const _file = event.target.files?.[0];
    if (_file == null) {
      return;
    }
    setFile(_file);
    onImageChange?.(_file);
  };
  useEffect(() => {
    let isCancel = false;
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = event => {
      const _result = event.target?.result;
      if (_result && !isCancel) {
        setImageUrl(_result);
      }
    };
    fileReader.readAsDataURL(file);
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);
  return (
    <Stack direction={'column'} alignItems="start" gap={3}>
      {imageUrl && (
        <Stack maxHeight={500} maxWidth={500}>
          <img
            alt="img-preview"
            className={styles['app-select-image__image']}
            src={imageUrl.toString() ?? defaultImageLink}
          />
        </Stack>
      )}
      <TextField type="file" className="hidden" onChange={handleUploadFile} />
    </Stack>
  );
};
