import { HttpError } from '@js-camp/core/models/httpError';
import { Token } from '@js-camp/core/models/token';

import { TOKEN_KEY } from '../../constant';
import { getProfile } from '../../services/api/getProfile';
import { getValueFromLocalStorage, removeKeyFromLocalStorage } from '../../services/localStore';

const token = getValueFromLocalStorage<Token>(TOKEN_KEY);

if (!token) {
  window.location.href = '../index.html';
}

/** Display user profile on screen. */
async function displayProfile(): Promise<void> {
  if (token) {
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
    if (!titleElement) {
      return;
    }
    if (!infoWrapper) {
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
}

document.querySelector('.button')?.addEventListener('click', () => {
  window.location.href = '../index.html';
  removeKeyFromLocalStorage(TOKEN_KEY);
});

displayProfile();
