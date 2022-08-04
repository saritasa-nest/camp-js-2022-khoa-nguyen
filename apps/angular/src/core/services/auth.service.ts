import { Injectable } from '@angular/core';

/** Enum of general errors. */
enum Error {
  Required = 'required',
  IsEmail = 'isEmail',
  NotMatch = 'notMatch',
}

type KeyError = {
  [key in Error]?: {

    /** Checking condition. */
    check: boolean;

    /** Message of error. */
    message: string;
  };
};

/** Validation of error.*/
/** Validation of error.*/
export interface ErrorValidation {
  [key: string]: KeyError;
}

/** Authorization service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public constructor() { }
}
