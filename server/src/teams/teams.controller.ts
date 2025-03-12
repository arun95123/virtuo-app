import { Controller, Get } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDto } from './dto/team.dto';

@Controller('api/teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  getTeams(): Promise<TeamDto[]> {
    return this.teamsService.getTeams();
  }
}
