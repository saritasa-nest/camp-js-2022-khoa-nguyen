import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { StudioDto } from '@js-camp/core/dtos/studio.dto';
import { StudioMapper } from '@js-camp/core/mappers/studio.mapper';
import { Studio } from '@js-camp/core/models/studio';

import { http } from '..';
const url = 'anime/studios/';

export namespace StudioService {

  /**
   * Fetches a list of studios.
   * @param searchQuery Search query.
   */
  export async function fetchStudios(searchQuery: string): Promise<readonly Studio[]> {
    const { data } = await http.get<PaginationDto<StudioDto>>(url, {
      params: { search: searchQuery },
    });
    return data.results.map(dto => StudioMapper.fromDto(dto));
  }

  /**
   * Create a new studio.
   * @param newStudio New studio to create.
   */
  export async function createStudio(newStudio: string): Promise<Studio> {
    const { data } = await http.post<StudioDto>(url, {
      name: newStudio,
    });
    return StudioMapper.fromDto(data);
  }
}
