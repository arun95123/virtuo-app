import { Controller, Get, Post, Body } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDto } from './dto/team.dto';
import { CreateTeamDto } from './dto/create-team.dto';

@Controller('api/teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  getTeams(): Promise<TeamDto[]> {
    return this.teamsService.getTeams();
  }

  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto): Promise<TeamDto> {
    return this.teamsService.createTeam(createTeamDto);
  }
}
