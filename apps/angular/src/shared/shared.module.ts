import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SelectComponent } from './components/select/select.component';

/** Shared module. */
@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule],
})
export class SharedModule {}
