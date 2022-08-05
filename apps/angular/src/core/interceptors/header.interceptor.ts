import {
  HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Token } from '@js-camp/core/models';

import { key } from '../../constants';
import { LocalStoreService } from '../services';

/** Interceptor header handler. */
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  public constructor(private localStoreService: LocalStoreService) {}

  /**
   * Header interceptors.
   * @param request Http Request.
   * @param next HTTP Request handler.
   */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStoreService.getValue<Token>(key.token);
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const authRequest = request.clone({ headers });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
