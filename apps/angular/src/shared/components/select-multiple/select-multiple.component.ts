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
  @Input() public formGroup: FormGroup | null = null;

  /** On create entity. */
  @Output() public createEntity = new EventEmitter();

  /** Handlers entity create. */
  public onCreateEntity(): void {
    this.createEntity.emit();
  }

  public constructor() {
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

  /** On remove selected value. */
  @Output() public removeSelectedValue = new EventEmitter();

  /**
   * Handlers remove selected value.
   * @param item Item to remove.
   */
  public onRemoveSelectedValue(item: DefaultEntity): void {
    this.removeSelectedValue.emit(item);
  }

}
