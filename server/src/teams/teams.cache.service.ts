import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { TeamDto } from './dto/team.dto';

@Injectable()
export class TeamsCacheService {
  private cacheKey = 'teams';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getAllTeams(): Promise<TeamDto[] | null> {
    return await this.cacheManager.get<TeamDto[]>(this.cacheKey);
  }
}
