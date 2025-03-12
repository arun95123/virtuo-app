import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamsCacheService } from './teams.cache.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, TeamsCacheService],
})
export class TeamsModule {}
