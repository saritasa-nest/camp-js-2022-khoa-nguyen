import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap, Observable } from 'rxjs';

import { AuthService } from '../services';

/** Anime detail guard. */
@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanActivate {

  public constructor(private readonly authService: AuthService, private readonly router: Router) {}

  /**
   * Can activate router.
   */
  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn$.pipe(
      tap(isLoggedIn => {
        if (isLoggedIn) {
          return;
        }
        this.router.navigate(['auth/login']);
      }),
    );
  }
}
