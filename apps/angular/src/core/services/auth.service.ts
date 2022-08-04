import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorUserDto, HttpErrorDto, TokenDto, UserDto } from '@js-camp/core/dtos';
import { ErrorUserMapper, HttpErrorMapper, TokenMapper, UserMapper } from '@js-camp/core/mappers';
import { ErrorUser, HttpError, Token, User } from '@js-camp/core/models';
import { catchError, map, Observable, of } from 'rxjs';

import { ApiService } from '.';

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

  public constructor(private readonly apiService: ApiService) { }

  /**
   * Create user.
   * @param userInfo User information model.
   */
  public createUser(userInfo: User): Observable<Token | HttpError<ErrorUser>> {
    const userDto = UserMapper.toDto(userInfo);
    return this.apiService.postData<TokenDto, UserDto>('auth/register/', userDto).pipe(
      map(value => TokenMapper.fromDto(value)),
      catchError((value: unknown) => {
        const httpError = ((value as HttpErrorResponse).error) as HttpErrorDto<ErrorUserDto>;
        return of(HttpErrorMapper.fromDto<ErrorUserDto, ErrorUser>(httpError, ErrorUserMapper.fromDto));
      }),
    );
  }

}
