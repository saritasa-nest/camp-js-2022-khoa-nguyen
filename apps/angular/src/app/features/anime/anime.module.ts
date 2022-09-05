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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';

import { SharedModule } from '../../../shared/shared.module';

import { AnimeTableComponent } from './anime-table/anime-table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeComponent } from './anime.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';

/** Anime module. */
@NgModule({
  declarations: [
    AnimeTableComponent,
    PaginationComponent,
    AnimeComponent,
    DetailComponent,
    EditComponent,
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
    MatDatepickerModule,
    MatSlideToggleModule,
    CommonModule,
    FormsModule,
    SharedModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
})
export class AnimeModule {}