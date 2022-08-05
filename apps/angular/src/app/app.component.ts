import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '../core/services';

/** App component. */
@Component({
  selector: 'camp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public constructor(private readonly authService: AuthService) {
    this.authService.handleCheckToken();
  }
}
