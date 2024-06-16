import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [EventsModule, AdminsModule],
})
export class FeaturesModule {}
