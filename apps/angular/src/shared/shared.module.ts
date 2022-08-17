import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SelectMultipleComponent } from './components/select-multiple/select-multiple.component';

/** Shared module. */
@NgModule({
  declarations: [NavigationComponent, SelectMultipleComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatChipsModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [NavigationComponent, SelectMultipleComponent],
})
export class SharedModule {}
