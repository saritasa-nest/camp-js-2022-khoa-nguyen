import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_KEY } from '../../constants';

/** Interceptor of api key handler. */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  public constructor() {}

  /**
   * Api key header interceptors.
   * @param request Http Request.
   * @param next HTTP Request handler.
   */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestClone = request.clone({
      headers: request.headers.set('Api-Key', API_KEY),
    });
    return next.handle(requestClone);
  }
}
