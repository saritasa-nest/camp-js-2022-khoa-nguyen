import { navigate } from '@js-camp/core/utils';

import { HOME_URL, LOGIN_URL, PROFILE_URL } from '../constants';
import { AuthorizationService } from '../services/authorization';

/** Render header function. */
export async function renderHeader(): Promise<void> {
  const header = document.querySelector('.header');
  if (!header) {
    return;
  }
  const htmlHeader = await getUIHeader();
  header.innerHTML = htmlHeader;
  header.querySelector('.link_logout')?.addEventListener('click', () => {
    AuthorizationService.logOut();
    navigate(HOME_URL);
  });
}

/** Render header function. */
async function getUIHeader(): Promise<string> {
  if (await AuthorizationService.isLoggedIn()) {
    return `
    <div class="header__navigation">
      <a href="${PROFILE_URL}" class="link header_link">Profile</a>
      <a href="${HOME_URL}" class="link header_link">Home</a>
    </div>
    <div div class="header__user">
      <a href="#" class="link header_link link_logout">Log out</a>
    </div>
  `;
  }
  return `
  <div class="header__navigation">
    <a href="${HOME_URL}" class="link header_link">Home</a>
  </div>
  <div div class="header__user">
    <a href="${LOGIN_URL}" class="link header_link">Log in</a>
  </div>
`;
}
