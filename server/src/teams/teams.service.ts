import {
  Injectable,
  InternalServerErrorException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

import { TeamDto } from './dto/team.dto';
import { TeamsCacheService } from './teams.cache.service';
import { Team } from './interfaces/teams.api.interface';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamExisitsException } from './exceptions/teamExistsException';

@Injectable()
export class TeamsService implements OnApplicationBootstrap {
  constructor(
    private readonly teamsCacheService: TeamsCacheService,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const teams = await this.fetchTeams();
    if (teams) {
      await this.teamsCacheService.setTeams(teams);
    }
  }

  private async fetchTeams(): Promise<TeamDto[] | null> {
    try {
      const api = this.configService.get<string>('TEAMS_API_URL', '');
      const authHeader = this.configService.get<string>('TEAMS_API_KEY', '');
      const response = await axios.get<AxiosResponse<Team[]>>(api, {
        headers: {
          Authorization: authHeader,
        },
      });
      const teams = response.data.data;
      const formattedTeams = teams.slice(0, 5).map((team, index) => ({
        id: index + 1,
        name: team.name,
        city: team.city,
        abbr: team.abbr,
        stadium: team.stadium,
      }));
      return formattedTeams;
    } catch (e: unknown) {
      console.error('Unable to fetch teams', e);
      return null;
    }
  }

  async getTeams(): Promise<TeamDto[]> {
    try {
      const teams = await this.teamsCacheService.getAllTeams();
      return teams ? teams : [];
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException();
    }
  }

  async createTeam(newTeam: CreateTeamDto): Promise<TeamDto> {
    try {
      const teams = await this.getTeams();
      if (teams.find((t) => t.name === newTeam.name)) {
        throw new TeamExisitsException();
      }
      return await this.teamsCacheService.createTeam(newTeam);
    } catch (e) {
      console.error(e);
      if (e instanceof TeamExisitsException) {
        throw e;
      }
      throw new InternalServerErrorException();
    }
  }
}
