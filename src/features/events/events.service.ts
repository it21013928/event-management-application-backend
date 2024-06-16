import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventStatus } from '../events/entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    const savedEvent = await createdEvent.save();
    return savedEvent;
  }

  async findAll(): Promise<Event[]> {
    return await this.eventModel.find();
  }

  async findOne(id: string): Promise<Event | null> {
    return await this.eventModel.findById(id);
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<Event | null> {
    // Automatically update status to 'overdue' if expectedDate has passed
    const eventToUpdate = await this.eventModel.findById(id);
    if (eventToUpdate && eventToUpdate.expectedDate < new Date()) {
      updateEventDto.status = EventStatus.OVERDUE;
    }
    return await this.eventModel.findByIdAndUpdate(id, updateEventDto, {
      new: true,
    }); // Return updated document
  }

  async remove(id: string): Promise<any> {
    // Update to Promise<void> if desired
    return await this.eventModel.findByIdAndDelete(id);
  }
}
