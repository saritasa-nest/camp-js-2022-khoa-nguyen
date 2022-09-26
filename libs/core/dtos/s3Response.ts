export interface S3ResponseDto {

  /** S3 response. */
  readonly PostResponse: {

    /** Image URL location object. */
    readonly Location: {

      /** Image URL. */
      readonly _text: string;
    };
  };
}
