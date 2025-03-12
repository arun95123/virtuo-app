import { HttpException, HttpStatus } from '@nestjs/common';

export class TeamExisitsException extends HttpException {
  constructor() {
    super('Team Name already exists', HttpStatus.BAD_REQUEST);
  }
}
