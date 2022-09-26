import { S3ResponseDto } from '@js-camp/core/dtos/s3Response';
import { S3UploadDto } from '@js-camp/core/dtos/s3Upload';
import { xml2js } from 'xml-js';

import { http } from '..';

export namespace S3CloudService {

  /**
   * Upload image to s3 cloud.
   * @param formData Upload data.
   * @param image Image file.
   */
  export async function uploadToS3Server(formData: S3UploadDto, image: File): Promise<string> {
    const uploadData = new FormData();
    for (const s3Key of Object.keys(formData)) {
      if (s3Key === 'form_action') {
        continue;
      }
      uploadData.append(s3Key, formData[s3Key as keyof S3UploadDto]);
    }
    uploadData.append('file', image);
    const { data: s3Response } = await http.post(formData.form_action, uploadData, { responseType: 'text' });

    const s3ResponseDto = xml2js(s3Response, { compact: true }) as S3ResponseDto;

    return s3ResponseDto.PostResponse.Location._text;
  }
}
