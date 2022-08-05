import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Navigation component. */
@Component({
  selector: 'camp-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  public constructor() {}
}
