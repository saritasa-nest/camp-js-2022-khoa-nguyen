import { Injectable } from '@angular/core';
import { TokenDto } from '@js-camp/core/dtos';
import { TokenMapper } from '@js-camp/core/mappers';
import { Token } from '@js-camp/core/models';
import { map, Observable, of, tap } from 'rxjs';

import { key } from '../../constants';

import { ApiService } from './api.service';

import { LocalStoreService } from './local-store.service';

/** Token handle service. */
@Injectable({
  providedIn: 'root',
})
export class TokenService {

  public constructor(private localStoreService: LocalStoreService, private apiService: ApiService) { }

  /** Get current token. */
  public getToken(): Token | null {
    return this.localStoreService.getValue<Token>(key.token);
  }

  /** Refresh token. */
  public refreshToken(): Observable<Token | null> {
    const currentToken = this.getToken();
    if (!currentToken) {
      return of(null);
    }
    return this.apiService
      .postData<TokenDto, string>('/auth/token/refresh', currentToken.refresh)
      .pipe(
        map(token => TokenMapper.fromDto(token)),
        tap(token => this.localStoreService.setValue<Token>(key.token, token)),
      );
  }
}
