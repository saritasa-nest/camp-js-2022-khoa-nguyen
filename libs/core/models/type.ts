
import { Immerable, OmitImmerable } from './immerable';

/** Type. */
export class Type extends Immerable {

  /** Title of Type. */
  public readonly title: string;

  /** Name of Type. */
  public readonly value: Type;

  public constructor(data: PostInitArgs) {
    super();
    this.title = data.title;
    this.value = data.value;
  }
}

type PostInitArgs = OmitImmerable<Type>;
