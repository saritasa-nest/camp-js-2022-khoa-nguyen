import { HttpError } from '@js-camp/core/models/httpError';
import { Token } from '@js-camp/core/models/token';
import { navigate } from '@js-camp/core/utils';

import { TOKEN_KEY } from '../../constants';
import { getProfile } from '../../services/api/getProfile';
import { getValueFromLocalStorage, removeKeyFromLocalStorage } from '../../services/localStore';

const token = getValueFromLocalStorage<Token>(TOKEN_KEY);

if (token === null) {
  navigate('../index.html');
}

/** Display user profile on screen. */
async function displayProfile(): Promise<void> {
  if (token === null) {
    return;
  }
  const profile = await getProfile(token);
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
  if (titleElement === null || titleElement === undefined) {
    return;
  }
  if (infoWrapper === null || infoWrapper === undefined) {
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
  navigate('../index.html');
  removeKeyFromLocalStorage(TOKEN_KEY);
});

displayProfile();
