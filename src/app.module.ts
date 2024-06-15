import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeaturesModule } from './features/features.module';
import { DatabaseModule } from './core/config/database/database.module';

@Module({
  imports: [DatabaseModule, FeaturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
