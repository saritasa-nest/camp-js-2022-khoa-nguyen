import {
  HttpErrorResponse,
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '@js-camp/core/models';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { API_KEY } from '../../constants';
import { AuthService } from '../services';

/** Interceptor header handler. */
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  public constructor(private authService: AuthService) {}

  /**
   * Header interceptors.
   * @param request Http Request.
   * @param next HTTP Request handler.
   */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    const defaultRequest = request.clone({
      headers: request.headers
        .set('Api-Key', API_KEY),
    });
    if (token) {
      const authRequest = this.addTokenHeader(request, token);
      return next.handle(authRequest).pipe(
        catchError((error: unknown) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(authRequest, next);
          }
          return throwError(() => error);
        }),
      );
    }
    return next.handle(defaultRequest);
  }

  /**
   * Handle error.
   * @param request Http request.
   * @param next Http handler.
   */
  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.refreshToken().pipe(
      switchMap(token => next.handle(this.addTokenHeader(request, token))),
    );
  }

  /**
   * Add Token to header.
   * @param request Http request.
   * @param token Token.
   */
  private addTokenHeader(request: HttpRequest<unknown>, token: Token | null): HttpRequest<unknown> {
    if (token == null) {
      throw new Error('Invalid token.');
    }
    return request.clone({
      headers: request.headers
        .append('Authorization', `Bearer ${token.access}`)
        .set('Api-Key', API_KEY),
    });
  }
}
