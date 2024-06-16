import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EventsModule, AdminsModule, UsersModule],
})
export class FeaturesModule {}
