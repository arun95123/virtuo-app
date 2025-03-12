import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    TeamsModule,
  ],
})
export class AppModule {}
