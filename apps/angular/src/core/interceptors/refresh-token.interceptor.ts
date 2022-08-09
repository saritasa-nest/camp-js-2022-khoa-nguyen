import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { AuthService } from '../services';

/** Refresh token handler. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  public constructor(private readonly authService: AuthService) {}

  /**
   * Refresh token header interceptors.
   * @param request HTTP Request.
   * @param next HTTP Request handler.
   */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    if (token == null) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error: unknown) => {
        this.authService.logout();
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.authService.refreshToken(token).pipe(
            switchMap(() => next.handle(request)),
          );
        }
        return throwError(() => error);
      }),
    );
  }

}
