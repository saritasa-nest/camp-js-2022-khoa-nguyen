import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '@js-camp/core/models';
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
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.authService.logout();
          return this.authService.refreshToken(token).pipe(
            switchMap(newToken => next.handle(this.addTokenHeader(request, newToken))),
            catchError(() => next.handle(request.clone({ headers: request.headers.delete('Authorization') }))),
          );
        }
        return throwError(() => error);
      }),
    );
  }

  /**
   * Add Token to header.
   * @param request Http request.
   * @param token Token.
   */
  private addTokenHeader(request: HttpRequest<unknown>, token: Token): HttpRequest<unknown> {
    return request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${token.access}`),
    });
  }

}
