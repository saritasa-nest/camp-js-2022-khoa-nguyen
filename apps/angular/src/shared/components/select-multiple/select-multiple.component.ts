import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

interface OptionsList {

  /** Value of options. */
  value: string;

  /** Title of options. */
  title: string;
}

/** Select multiple component. */
@Component({
  selector: 'camp-select-multiple',
  templateUrl: './select-multiple.component.html',
  styleUrls: ['./select-multiple.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMultipleComponent {

  /** Value of select. */
  @Input()
  public value: string[] = [];

  /** Value of select. */
  @Input()
  public optionsList: OptionsList[] = [];

  /** On selection change event. */
  @Output()
  public selectionChange = new EventEmitter();

  /** Emit selection event. */
  public onSelectionChange(): void {
    this.selectionChange.emit();
  }
}
