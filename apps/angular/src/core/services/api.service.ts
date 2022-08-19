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
   * Get data from api.
   * @param url Url of api call.
   * @param params Query params.
   */
  public getData<Dto, ParamDto>(url: string, params?: ParamDto): Observable<Dto> {
    const finishedUrl = BASE_URL + url;
    return this.httpClient
      .get<Dto>(finishedUrl, { params: { ...params } })
      .pipe(
        catchError((error: unknown) => throwError(() => error)),
      );
  }

  /**
   * Post data to api.
   * @param url Url of api call.
   * @param value Value to post.
   */
  public postData<ReceiveValueDto, SendValueDto>(url: string, value: SendValueDto): Observable<ReceiveValueDto> {
    const finishedUrl = BASE_URL + url;
    return this.httpClient.post<ReceiveValueDto>(finishedUrl, value);
  }

  /**
   * Delete item from api.
   * @param url Url of api call.
   */
  public deleteData(url: string): Observable<Object> {
    const finishedUrl = BASE_URL + url;
    return this.httpClient.delete(finishedUrl).pipe(
      catchError((error: unknown) => throwError(() => error)),
    );
  }

  /**
   * Put data to api.
   * @param url Url of api call.
   * @param value Value to put.
   */
  public editData<ReceiveValueDto, SendValueDto>(url: string, value: SendValueDto): Observable<ReceiveValueDto> {
    const finishedUrl = BASE_URL + url;
    return this.httpClient.put<ReceiveValueDto>(finishedUrl, value).pipe(
      catchError((error: unknown) => throwError(() => error)),
    );
  }
}
