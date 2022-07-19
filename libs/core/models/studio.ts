import { Immerable, OmitImmerable } from './immerable';

/** Studio. */
export class Studio extends Immerable {

  /** Id. */
  public readonly id: number;

  /** Name. */
  public readonly name: string;

  /** Created date. */
  public readonly created: string;

  /** Modified date. */
  public readonly modified: string;

  public constructor(data: PostInitArgs) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.created = data.created;
    this.modified = data.modified;
  }
}

type PostInitArgs = OmitImmerable<Studio>;
