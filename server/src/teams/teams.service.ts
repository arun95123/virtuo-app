import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamsService {
  constructor() {}

  getTeams(): string {
    return 'teams';
  }
}
