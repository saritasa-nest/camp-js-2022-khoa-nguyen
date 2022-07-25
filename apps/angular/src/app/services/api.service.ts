import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** Api service methods. */
@Injectable({
  providedIn: 'root',
})

/** Api service methods. */
export class ApiService {
  private BASE_URL = 'https://api.camp-js.saritasa.rocks/api/v1/';

  public constructor(private api: HttpClient) { }

  /**
   *  Api service constructors.
   * @param url Url of api call.
   */
  public getData<T>(url: string): Observable<T> {
    try {
      const finishedUrl = this.BASE_URL + url;
      return this.api.get<T>(finishedUrl);
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  }
}
