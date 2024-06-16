import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum EventStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
}

@Schema()
export class Event extends Document {
    
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  expectedDate: Date;

  @Prop({ default: EventStatus.PENDING })
  status: EventStatus;
}

export const EventSchema = SchemaFactory.createForClass(Event);
