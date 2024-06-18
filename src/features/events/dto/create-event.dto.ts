import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsDateString } from '@nestjs/class-validator';
import { IsFutureDate } from '../../../core/decorators/date-after-today.decorator';

export class CreateEventDto extends PartialType(Event) {
  @IsString()
  readonly name?: string;

  @IsDateString()
  @IsFutureDate({
    message: 'expectedDate must be a future date',
  })
  readonly expectedDate?: Date;
}
