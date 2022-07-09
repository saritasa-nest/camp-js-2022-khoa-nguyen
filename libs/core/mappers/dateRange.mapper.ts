import { DateRangeDto } from '../dtos/dateRange.dto';
import { DateRange } from '../models/anime';

export namespace DateRangeMapper {

  /**
   * Maps dto to model.
   * @param dto Genre dto.
   */
  export function fromDto(dto: DateRangeDto): DateRange {
    return new DateRange({
      start: new Date(dto.start),
      end: new Date(dto.end),
    });
  }
}
