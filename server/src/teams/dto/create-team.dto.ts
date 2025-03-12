import { OmitType } from '@nestjs/mapped-types';
import { TeamDto } from './team.dto';

export class CreateTeamDto extends OmitType(TeamDto, ['id'] as const) {}
