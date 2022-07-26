import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { getAnimeQueryList } from 'apps/angular/src/constants';

import { AnimeService } from '../../services/anime.service';
import { AnimeTableComponent } from '../anime-table/anime-table.component';

/** Pagination options */
@Component({
  selector: 'camp-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})

/** Init pagination component. */
export class PaginationComponent implements OnInit {
  @Input name;

  public constructor(private animeService: AnimeService) {}

  OnPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    this.animeService.getAnimeList(getAnimeQueryList()).subscribe;
  }

  public ngOnInit(): void {}
}
