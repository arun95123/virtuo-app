import { Controller, Get } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('api/teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  getTeams(): string {
    return this.teamsService.getTeams();
  }
}
