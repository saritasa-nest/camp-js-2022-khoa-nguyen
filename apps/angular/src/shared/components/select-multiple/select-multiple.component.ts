import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

/** Default type of entity. */
export interface DefaultEntity {

  /** Id of entity. */
  id: number;

  /** Name of entity. */
  name: string;
}

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
  @Input() public entities: readonly DefaultEntity[] | null = [];

  /** New entity name. */
  @Input() public newEntity = '';

  /** Form group. */
  @Input() public formGroup: FormGroup<{}> = new FormGroup<{}>({});

  /** On create entity. */
  @Output() public createEntity = new EventEmitter();

  /** Selected values. */
  @Input() public selectedValues: readonly DefaultEntity[] | null = [];

  /** Handlers entity create. */
  public onCreateEntity(): void {
    this.createEntity.emit();
  }

  /**
   * Tracks entity by ID.
   * @param _index Entity's index.
   * @param entity Entity.
   */
  public trackItemEntity(_index: number, entity: DefaultEntity): number {
    return entity.id;
  }

  /**
   * Tracks entity by ID.
   * @param _index Item selected's index.
   * @param selectedItems Item selected.
   */
  public trackItemSelected(_index: number, selectedItems: DefaultEntity): number {
    return selectedItems.id;
  }

}
