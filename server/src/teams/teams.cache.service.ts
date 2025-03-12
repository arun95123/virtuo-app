import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { TeamDto } from './dto/team.dto';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsCacheService {
  private cacheKey = 'teams';

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getAllTeams(): Promise<TeamDto[] | null> {
    return await this.cacheManager.get<TeamDto[]>(this.cacheKey);
  }

  async setTeams(teams: TeamDto[]): Promise<TeamDto[] | null> {
    return await this.cacheManager.set(this.cacheKey, teams);
  }

  async createTeam(team: CreateTeamDto): Promise<TeamDto> {
    const teams = (await this.getAllTeams()) ?? [];
    const id = teams.length + 1;
    const newTeam: TeamDto = {
      id,
      ...team,
    };
    await this.setTeams([...teams, newTeam]);
    return newTeam;
  }
}
