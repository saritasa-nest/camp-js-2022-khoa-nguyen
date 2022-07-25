import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  constructor(private api: HttpClient) { }

  public getData<T>(url: string): Observable<T> {
    const finishedUrl = '${BASE_URL}';
    return this.api.get<T>(url, this.ht);
  }
}
