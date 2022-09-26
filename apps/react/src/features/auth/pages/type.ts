/** State of location. */
export interface StateLocation {

  /** Path of state. */
  readonly path: string;
}

/** Snackbar configure. */
export interface SnackBarConfig {

  /** Open state. */
  isOpen: boolean;

  /** Current message. */
  message: string;

  /** Duration. */
  duration: number;
}
