import { PartialType } from '@nestjs/mapped-types';
import { Types } from 'mongoose';
import { EventStatus } from '../entities/event.entity';

export class UpdateEventDto extends PartialType(Event) {
  readonly userId?: Types.ObjectId;
  readonly status?: EventStatus;
}
