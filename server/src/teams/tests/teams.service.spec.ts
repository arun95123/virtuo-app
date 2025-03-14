import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from '../teams.service';
import { TeamsCacheService } from '../teams.cache.service';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import { CreateTeamDto } from '../dto/create-team.dto';
import { TeamExisitsException } from '../exceptions/teamExistsException';

jest.mock('axios');

describe('TeamsService', () => {
  let service: TeamsService;
  let teamsCacheService: TeamsCacheService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: TeamsCacheService,
          useValue: {
            getAllTeams: jest.fn(),
            setTeams: jest.fn(),
            createTeam: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    teamsCacheService = module.get<TeamsCacheService>(TeamsCacheService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('onApplicationBootstrap', () => {
    it('should fetch and cache teams on application bootstrap', async () => {
      const mockTeams = [
        {
          id: 16,
          name: 'Team A',
          short_name: 'SOMETHING',
          city: 'City A',
          abbr: 'A',
          stadium: 'Stadium A',
        },
        {
          id: 25,
          name: 'Team B',
          short_name: 'IGNORED',
          city: 'City B',
          abbr: 'B',
          stadium: 'Stadium B',
        },
      ];
      const teamResponse = { data: { data: mockTeams } };

      const api = 'http://api.test/teams';
      const authHeader = 'Bearer test';
      jest.spyOn(configService, 'get').mockImplementation((key: string) => {
        if (key === 'TEAMS_API_URL') return api;
        if (key === 'TEAMS_API_KEY') return authHeader;
        return '';
      });
      const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue(teamResponse);
      const setTeamsSpy = jest.spyOn(teamsCacheService, 'setTeams');

      await service.onApplicationBootstrap();
      expect(axiosSpy).toHaveBeenCalledWith(api, {
        headers: { Authorization: authHeader },
      });
      expect(setTeamsSpy).toHaveBeenCalledWith([
        {
          id: 1,
          name: 'Team A',
          city: 'City A',
          abbr: 'A',
          stadium: 'Stadium A',
        },
        {
          id: 2,
          name: 'Team B',
          city: 'City B',
          abbr: 'B',
          stadium: 'Stadium B',
        },
      ]);
    });
  });

  describe('getTeams', () => {
    it('should return an array of teams', async () => {
      const mockTeams = [
        {
          id: 1,
          name: 'Team A',
          city: 'City A',
          abbr: 'A',
          stadium: 'Stadium A',
        },
        {
          id: 2,
          name: 'Team B',
          city: 'City B',
          abbr: 'B',
          stadium: 'Stadium B',
        },
      ];
      jest.spyOn(teamsCacheService, 'getAllTeams').mockResolvedValue(mockTeams);

      const result = await service.getTeams();
      expect(result).toEqual(mockTeams);
    });

    it('should return an empty array if no teams are found', async () => {
      jest.spyOn(teamsCacheService, 'getAllTeams').mockResolvedValue(null);

      const result = await service.getTeams();
      expect(result).toEqual([]);
    });

    it('should throw an InternalServerErrorException if an error occurs', async () => {
      jest
        .spyOn(teamsCacheService, 'getAllTeams')
        .mockRejectedValue(new Error('Error'));

      await expect(service.getTeams()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
  describe('createTeam', () => {
    it('should create a new team', async () => {
      const newTeam: CreateTeamDto = {
        name: 'Team C',
        city: 'City C',
        abbr: 'C',
        stadium: 'Stadium C',
      };
      const createdTeam = {
        id: 1,
        ...newTeam,
      };

      jest.spyOn(service, 'getTeams').mockResolvedValue([]);
      jest
        .spyOn(teamsCacheService, 'createTeam')
        .mockResolvedValue(createdTeam);

      const result = await service.createTeam(newTeam);
      expect(result).toEqual(createdTeam);
    });

    it('should throw TeamExisitsException if team already exists', async () => {
      const newTeam: CreateTeamDto = {
        name: 'Team A',
        city: 'City A',
        abbr: 'A',
        stadium: 'Stadium A',
      };
      const existingTeams = [
        {
          id: 1,
          name: 'Team A',
          city: 'City A',
          abbr: 'A',
          stadium: 'Stadium A',
        },
      ];

      jest.spyOn(service, 'getTeams').mockResolvedValue(existingTeams);

      await expect(service.createTeam(newTeam)).rejects.toThrow(
        TeamExisitsException,
      );
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      const newTeam: CreateTeamDto = {
        name: 'Team D',
        city: 'City D',
        abbr: 'D',
        stadium: 'Stadium D',
      };

      jest.spyOn(service, 'getTeams').mockRejectedValue(new Error('Error'));

      await expect(service.createTeam(newTeam)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });
});
