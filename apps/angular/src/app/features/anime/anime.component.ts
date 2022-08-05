import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '../../../core/services';

/** Anime component. */
@Component({
  selector: 'camp-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeComponent {
  public constructor(authService: AuthService) {
    authService.handleCheckToken();

    // console.log(authService.isLoggedIn.getValue());
  }
}
