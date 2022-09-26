import { AxiosRequestConfig } from 'axios';

import { TokenService } from '../services/tokenService';

const s3UploadRoute = 'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev';

/**
 * Add token to header.
 * @param config Axios config.
 */
export async function addToken(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  const { headers } = config;

  if (!shouldAddToken(config.url)) {
    return config;
  }

  const token = await TokenService.get();

  if (token == null) {
    return config;
  }
  return {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${token.access}`,
    },
  };
}

/**
 * Check if interceptor should pass tokens to request or not.
 * @param url Url address of request.
 */
function shouldAddToken(url: string | undefined): boolean {
  if (url == null || url.includes(s3UploadRoute) || url.includes('auth')) {
    return false;
  }
  return true;
}
