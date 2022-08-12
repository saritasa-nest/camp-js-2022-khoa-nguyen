import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeDetailGuard } from '../../../core/guards';

import { AnimeComponent } from './anime.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: AnimeComponent },
  { path: 'detail/:id', component: DetailComponent, canActivate: [AnimeDetailGuard] },
];

/** Anime table view module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule { }
