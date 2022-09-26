import { Genre } from '@js-camp/core/models/genre';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';

import { http } from '..';

const url = 'anime/genres/';

export namespace GenresService {

  /**
   * Fetches a list of genres.
   * @param searchQuery Search query genre.
   */
  export async function fetchGenres(searchQuery: string): Promise<Genre[]> {
    const { data } = await http.get<PaginationDto<GenreDto>>(url, {
      params: { search: searchQuery },
    });
    return data.results.map(dto => GenreMapper.fromDto(dto));
  }

  /**
   * Create a new genre.
   * @param newGenre New genre to create.
   */
  export async function createGenre(newGenre: string): Promise<Genre> {
    const { data } = await http.post<GenreDto>(url, {
      name: newGenre,
      type: 'GENRES',
    });
    return GenreMapper.fromDto(data);
  }
}
