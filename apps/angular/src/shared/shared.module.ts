import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { SelectMultipleComponent } from './components/select-multiple/select-multiple.component';

/** Shared module. */
@NgModule({
  declarations: [SelectMultipleComponent],
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  exports: [SelectMultipleComponent],
})
export class SharedModule {}
