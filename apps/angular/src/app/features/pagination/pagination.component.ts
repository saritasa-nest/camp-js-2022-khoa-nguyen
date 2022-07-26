
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

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
  @Output() public pageChange = new EventEmitter();

  /** Init pagination component. */
  public ngOnInit(): void {}
}
