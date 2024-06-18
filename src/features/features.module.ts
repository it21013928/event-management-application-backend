import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EventsModule, AdminsModule, UsersModule, AuthModule],
})
export class FeaturesModule {}
