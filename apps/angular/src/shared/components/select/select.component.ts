import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
