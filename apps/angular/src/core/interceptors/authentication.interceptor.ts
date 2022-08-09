import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Token } from '@js-camp/core/models';

import { AuthService } from '../services';

/** Interceptor of authentication handler. */
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  public constructor(private readonly authService: AuthService) {}

  /**
   * Authentication header interceptors.
   * @param request Http Request.
   * @param next HTTP Request handler.
   */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token == null || !(token instanceof Token)) {
      return next.handle(request);
    }
    const authRequest = this.addTokenHeader(request, token);
    return next.handle(authRequest);
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
