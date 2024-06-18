import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findByUser(@Param('id') id: string) {
    return this.eventsService.findByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('allocate/:id')
  allocateUser(@Param('id') id: string, @Request() req) {
    return this.eventsService.allocateUser(id, req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateStatus')
  updateStatus(@Request() req) {
    return this.eventsService.updateState(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
