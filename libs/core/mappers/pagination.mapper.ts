import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

  /**
   * Maps dto to model.
   * @param dto Pagination DTO.
   * @param transformDtoToModel Callback which transform DTO object to Model.
   */
  export function fromDto<Dto, Model>(
    dto: PaginationDto<Dto>,
    transformDtoToModel: (dto: Dto) => Model,
  ): Pagination<Model> {

    return new Pagination<Model>({
      count: dto.count,
      next: dto.next,
      previous: dto.previous,
      results: dto.results.map(result => transformDtoToModel(result)),
    });
  }
}
