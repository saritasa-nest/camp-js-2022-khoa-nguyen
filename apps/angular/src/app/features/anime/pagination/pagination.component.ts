import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

/** Pagination options. */
@Component({
  selector: 'camp-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/** Init pagination component. */
export class PaginationComponent {

  /** Change event component.
   * @param event Event page change.
   */
  @Output() public pageChange = new EventEmitter<PageEvent>();

  /** Total items of pagination. */
  @Input() public totalItems: number | null = 0;

  /** Limit of pagination. */
  @Input() public limit: number | undefined = 25;

  /** Limit options of pagination. */
  @Input() public limitOptions: number[] = [5, 10, 15, 20, 25];

  public constructor() {
  }

  /** Active page of pagination. */
  @Input() public activePage: number | undefined | null = 0;

  /**
   * Handle pagination change and emit the status.
   * @param event Page event of pagination.
   */
  public onPaginationChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }

}
