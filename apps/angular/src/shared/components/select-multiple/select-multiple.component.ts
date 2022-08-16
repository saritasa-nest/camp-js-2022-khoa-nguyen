import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/** Multiple select component. */
@Component({
  selector: 'camp-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMultipleComponent {
  public constructor() {}

  /** Label of input. */
  @Input() public label = '';

  /** Form control of select. */
  @Input() public formControlSelectName = '';

  /** Search placeholder. */
  @Input() public searchPlaceholder = '';

  /** Form control of search field. */
  @Input() public formControlSearchName = '';

  /** Entities selected. */
  @Input() public entities: string[] = [];

  /** New entity name. */
  @Input() public newEntity = '';

  /** On create entity. */
  @Output() public createEntity = new EventEmitter();

  /** Handlers entity create. */
  public onCreateEntity(): void {
    this.createEntity.emit();
  }

  /**
   * Tracks entity by ID.
   * @param _index Anime's index into array.
   */
  public trackItemEntity(_index: number): number {
    return _index;
  }
}
