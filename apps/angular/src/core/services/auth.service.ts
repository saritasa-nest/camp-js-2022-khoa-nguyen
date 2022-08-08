import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorLoginDto, ErrorUserDto, HttpErrorDto, LoginDto, TokenDto, UserDto } from '@js-camp/core/dtos';
import { ErrorLoginMapper, ErrorUserMapper, HttpErrorMapper, LoginMapper, TokenMapper, UserMapper } from '@js-camp/core/mappers';
import { ErrorLogin, ErrorUser, HttpError, Login, Token, User } from '@js-camp/core/models';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { key } from '../../constants';

import { ApiService, LocalStoreService } from '.';

/** Enum of general errors. */
enum Error {
  Required = 'required',
  IsEmail = 'isEmail',
  NotMatch = 'notMatch',
  HttpErrors = 'httpError',
}

type KeyError<T> = {
  [key in Error]?: {

    /** Checking condition. */
    check: boolean;

    /** Message of error. */
    message?: string;

    /** Message of error as observable. */
    message$?: Observable<T>;
  };
};

/** Validation of error.*/
export interface ErrorValidation<T = undefined> {
  [key: string]: KeyError<T>;
}

/** Authorization service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /** Login state. */
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  /** Login state. */
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  public constructor(
    private readonly apiService: ApiService,
    private readonly localStoreService: LocalStoreService,
  ) { }

  /**
   * Create user.
   * @param userInfo User information model.
   */
  public createUser(userInfo: User): Observable<Token | HttpError<ErrorUser>> {
    const userDto = UserMapper.toDto(userInfo);
    return this.apiService.postData<TokenDto, UserDto>('auth/register/', userDto).pipe(
      map(value => TokenMapper.fromDto(value)),
      tap(() => this._isLoggedIn$.next(true)),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          const httpError = ((error as HttpErrorResponse).error) as HttpErrorDto<ErrorUserDto>;
          return of(HttpErrorMapper.fromDto<ErrorUserDto, ErrorUser>(httpError, ErrorUserMapper.fromDto));
        }
        return throwError(() => error);
      }),
    );
  }

  /**
   * Log user in.
   * @param loginInfo Login information.
   */
  public login(loginInfo: Login): Observable<Token | HttpError<ErrorLogin>> {
    const loginDto = LoginMapper.toDto(loginInfo);
    return this.apiService.postData<TokenDto, LoginDto>('auth/login/', loginDto).pipe(
      map(value => TokenMapper.fromDto(value)),
      tap(() => this._isLoggedIn$.next(true)),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          const httpError = error.error as HttpErrorDto<ErrorLoginDto>;
          return of(HttpErrorMapper.fromDto<ErrorLoginDto, ErrorLogin>(httpError, ErrorLoginMapper.fromDto));
        }
        return throwError(() => error);
      }),
    );
  }

  /** Check if user is logged. */
  public handleCheckToken(): void {
    const token = this.localStoreService.getValue<Token>(key.token);
    if (token instanceof Token) {
      this._isLoggedIn$.next(true);
    }
  }

  /** Log out. */
  public logout(): void {
    this._isLoggedIn$.next(false);
    this.localStoreService.remove(key.token);
  }

  /** Get current token. */
  public getToken(): Token | null {
    return this.localStoreService.getValue<Token>(key.token);
  }

  /**
   *  Refresh token.
   * @param currentToken Current token to set refresh.
   */
  public refreshToken(currentToken: Token): Observable<Token> {
    return this.apiService
      .postData<TokenDto, unknown>('/auth/token/refresh', { refresh: currentToken.refresh })
      .pipe(
        map(token => TokenMapper.fromDto(token)),
        tap(token => this.localStoreService.setValue<Token>(key.token, token)),
        catchError((error: unknown) => {
          this._isLoggedIn$.next(false);
          this.logout();
          return throwError(() => error);
        }),
      );
  }
}
