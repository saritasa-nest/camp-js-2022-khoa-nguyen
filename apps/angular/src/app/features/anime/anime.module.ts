import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

import { AnimeTableComponent } from './anime-table/anime-table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeComponent } from './anime.component';
import { DetailComponent } from './detail/detail.component';

/** Anime module. */
@NgModule({
  declarations: [
    AnimeTableComponent,
    PaginationComponent,
    AnimeComponent,
    DetailComponent,
  ],
  imports: [
    SharedModule,
    AnimeRoutingModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatChipsModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AnimeModule {}
