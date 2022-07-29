import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../../constants';

/** Api service methods. */
@Injectable({
  providedIn: 'root',
})

/** Api service methods. */
export class ApiService {

  public constructor(private api: HttpClient) { }

  /**
   *  Api service constructors.
   * @param url Url of api call.
   * @param params Query params.
   */
  public getData<Dto, ParamDto>(url: string, params?: ParamDto): Observable<Dto> {
    try {
      const finishedUrl = BASE_URL + url;
      return this.api.get<Dto>(finishedUrl, { params: { ...params } });
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  }
}
