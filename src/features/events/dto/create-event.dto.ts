import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsDateString } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';
import { EventStatus, Event } from '../entities/event.entity';
import { IsFutureDate } from '../../../core/decorators/date-after-today.decorator';

export class CreateEventDto extends PartialType(Event) {
  @IsString()
  readonly name?: string;

  @IsDateString()
  @IsFutureDate({
    message: 'expectedDate must be a future date',
  })
  readonly expectedDate?: Date;

  @IsString()
  @Transform(({ value }) => {
    const allowedStatuses = ['pending', 'completed', 'overdue'];
    return allowedStatuses.includes(value) ? value : 'pending'; // Set default to pending if invalid
  })
  status?: EventStatus;
}
