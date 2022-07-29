import { DateRangeDto } from '../dtos/dateRange.dto';
import { DateRange } from '../models/dateRange';

export namespace DateRangeMapper {

  /**
   * Maps dto to model.
   * @param dto Date range dto.
   */
  export function fromDto(dto: DateRangeDto): DateRange {
    return new DateRange({
      start: dto.start != null ? new Date(dto.start) : null,
      end: dto.end != null ? new Date(dto.end) : null,
    });
  }
}
