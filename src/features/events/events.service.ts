import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { Event, EventStatus } from './entities/event.entity';

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
    const events = await this.eventModel.find();
    const currentDate = new Date();

    const bulkOps = events
      .map((event) => {
        if (
          event.expectedDate < currentDate &&
          event.status === EventStatus.PENDING
        ) {
          return {
            updateOne: {
              filter: { _id: event._id },
              update: { $set: { status: EventStatus.OVERDUE } },
            },
          };
        }
        return null;
      })
      .filter((op) => op !== null);

    if (bulkOps.length > 0) {
      await this.eventModel.bulkWrite(bulkOps);
    }

    return await this.eventModel.find();
  }

  async findOne(id: string): Promise<Event | null> {
    return await this.eventModel.findById(id);
  }

  async findByUser(id: string): Promise<Event[]> {
    const events = await this.eventModel.find({ userId: id });
    const currentDate = new Date();

    const bulkOps = events
      .map((event) => {
        if (
          event.expectedDate < currentDate &&
          event.status === EventStatus.PENDING
        ) {
          return {
            updateOne: {
              filter: { _id: event._id },
              update: { $set: { status: EventStatus.OVERDUE } },
            },
          };
        }
        return null;
      })
      .filter((op) => op !== null);

    if (bulkOps.length > 0) {
      await this.eventModel.bulkWrite(bulkOps);
    }
    return await this.eventModel.find({ userId: id });
  }

  async updateState(body: any): Promise<Event | null> {
    return await this.eventModel.findByIdAndUpdate(body.id, {
      status: body.status,
    });
  }

  async allocateUser(id: string, user: any): Promise<Event | null> {
    return await this.eventModel.findByIdAndUpdate(id, {
      userId: user.userId,
    });
  }

  async remove(id: string): Promise<any> {
    return await this.eventModel.findByIdAndDelete(id);
  }
}
