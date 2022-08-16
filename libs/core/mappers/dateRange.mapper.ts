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

  /**
   * Maps model to dto.
   * @param date Date range model.
   */
  export function toDto(date: DateRange): DateRangeDto {
    return {
      end: date.end ? date.end.toISOString().split('T')[0] : null,
      start: date.start ? date.start.toISOString().split('T')[0] : null,
    };
  }
}
