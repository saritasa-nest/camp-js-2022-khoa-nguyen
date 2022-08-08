import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../../../core/services';

/** Navigation component. */
@Component({
  selector: 'camp-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {

  /** Check if user is authorized or not.*/
  public isAuth$: Observable<boolean>;

  public constructor(private readonly authService: AuthService) {
    this.isAuth$ = this.authService.isLoggedIn$;
  }

  /** Handle logout.*/
  public handleLogOut(): void {
    this.authService.logout();
  }
}
