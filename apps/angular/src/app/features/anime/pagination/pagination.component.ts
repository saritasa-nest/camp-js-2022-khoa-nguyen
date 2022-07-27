
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

/** Pagination options. */
@Component({
  selector: 'camp-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})

/** Init pagination component. */
export class PaginationComponent implements OnInit {

  /** Change event component.
   * @param event Event page change.
   */
  @Output() public pageChange = new EventEmitter<PageEvent>();

  /**
   * Handle pagination change and emit the status.
   * @param event Page event of pagination.
   */
  public onPaginationChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }

  /** Init pagination component. */
  public ngOnInit(): void {}

}
