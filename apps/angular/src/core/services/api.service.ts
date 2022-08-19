import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { BASE_URL } from '../../constants';

/** Api service methods. */
@Injectable({
  providedIn: 'root',
})

/** Api service methods. */
export class ApiService {

  public constructor(private readonly httpClient: HttpClient) { }

  /**
   * Api service constructors.
   * @param url Url of api call.
   * @param params Query params.
   */
  public getData<Dto, ParamDto>(url: string, params?: ParamDto): Observable<Dto> {
    const finishedUrl = BASE_URL + url;
    return this.httpClient.get<Dto>(finishedUrl, { params: { ...params } })
      .pipe(catchError((error: unknown) => throwError(() => error)));
  }
}
