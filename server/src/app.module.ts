import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register({ isGlobal: true }), TeamsModule],
})
export class AppModule {}
