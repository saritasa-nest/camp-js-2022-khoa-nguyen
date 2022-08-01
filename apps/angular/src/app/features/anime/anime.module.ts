import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';

import { AnimeTableComponent } from './anime-table/anime-table.component';
import { PaginationComponent } from './pagination/pagination.component';

/** Anime module. */
@NgModule({
  declarations: [AnimeTableComponent, PaginationComponent],
  imports: [
    MatSliderModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  exports: [AnimeTableComponent, PaginationComponent],
})
export class AnimeModule {}
