import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TeamDto } from './dto/team.dto';
import { TeamsCacheService } from './teams.cache.service';

@Injectable()
export class TeamsService {
  constructor(private readonly teamsCacheService: TeamsCacheService) {}

  async getTeams(): Promise<TeamDto[]> {
    try {
      const teams = await this.teamsCacheService.getAllTeams();
      return teams ? teams : [];
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }
}
