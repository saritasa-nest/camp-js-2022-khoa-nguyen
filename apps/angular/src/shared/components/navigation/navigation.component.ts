import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

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

  public constructor(private readonly authService: AuthService, private readonly router: Router) {
    this.isAuth$ = this.authService.isLoggedIn$;
  }

  /** Handle logout.*/
  public onLogOutButtonClick(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  /** Handle navigate to create anime page. */
  public onCreateAnimeClick(): void {
    this.router.navigate(['/edit']);
  }
}
