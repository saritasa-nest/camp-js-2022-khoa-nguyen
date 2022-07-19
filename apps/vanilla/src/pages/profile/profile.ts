import { HttpError } from '@js-camp/core/models/httpError';
import { Token } from '@js-camp/core/models/token';
import { navigate } from '@js-camp/core/utils';

import { LOGIN_URL, KEY_TOKEN } from '../../constants';
import { renderHeader } from '../../scripts/renderHeader';
import { getProfile } from '../../services/api/getProfile';
import { LocalStorageService } from '../../services/localStore';

const token = LocalStorageService.getValue<Token>(KEY_TOKEN);

if (token == null) {
  navigate(LOGIN_URL);
}

/** Display user profile on screen. */
async function displayProfile(): Promise<void> {
  if (token == null) {
    return;
  }
  const profile = await getProfile();
  const titleElement = document.querySelector('.title');
  const infoWrapper = document.querySelector('.info');
  if (profile instanceof HttpError) {
    return;
  }
  const PROFILE_INFO = [
    {
      title: 'Email',
      value: profile.email,
    },
    {
      title: 'First name',
      value: profile.firstName,
    },

    {
      title: 'Last name',
      value: profile.lastName,
    },
    {
      title: 'Created date',
      value: profile.created.toLocaleString(),
    },
    {
      title: 'Modified date',
      value: profile.modified.toLocaleString(),
    },
  ];
  if (titleElement == null) {
    return;
  }
  if (infoWrapper == null) {
    return;
  }
  const profileHTML = PROFILE_INFO.map(item => `
    <div class = "info__item">
      <h2>${item.title}</h2>
      <h3>${item.value}</h3>
    </div>
    `).join('');
  titleElement.innerHTML = `Welcome ${profile.firstName} ${profile.lastName}`;
  infoWrapper.innerHTML = profileHTML;
}

document.querySelector('.button')?.addEventListener('click', () => {
  navigate(LOGIN_URL);
  LocalStorageService.remove(KEY_TOKEN);
});

displayProfile();
renderHeader();
