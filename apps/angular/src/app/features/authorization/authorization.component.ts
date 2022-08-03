import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Authorization component. */
@Component({
  selector: 'camp-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AuthorizationComponent {}
