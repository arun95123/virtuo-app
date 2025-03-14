import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { TeamsCacheService } from '../teams.cache.service';
import { TeamDto } from '../dto/team.dto';
import { CreateTeamDto } from '../dto/create-team.dto';

describe('TeamsCacheService', () => {
  let service: TeamsCacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsCacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TeamsCacheService>(TeamsCacheService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTeams', () => {
    it('should return all teams from cache', async () => {
      const teams: TeamDto[] = [
        {
          id: 1,
          name: 'Team A',
          abbr: 'A',
          city: 'City A',
          stadium: 'Stadium A',
        },
      ];
      jest.spyOn(cacheManager, 'get').mockResolvedValue(teams);

      const result = await service.getAllTeams();
      expect(result).toEqual(teams);
      expect(cacheManager.get).toHaveBeenCalledWith('teams');
    });

    it('should return null if no teams are in cache', async () => {
      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);

      const result = await service.getAllTeams();
      expect(result).toBeNull();
      expect(cacheManager.get).toHaveBeenCalledWith('teams');
    });
  });

  describe('setTeams', () => {
    it('should set teams in cache', async () => {
      const teams: TeamDto[] = [
        {
          id: 1,
          name: 'Team A',
          abbr: 'A',
          city: 'City A',
          stadium: 'Stadium A',
        },
      ];
      jest.spyOn(cacheManager, 'set').mockResolvedValue(null);

      const result = await service.setTeams(teams);
      expect(result).toBeNull();
      expect(cacheManager.set).toHaveBeenCalledWith('teams', teams);
    });
  });
  describe('createTeam', () => {
    it('should create a new team and add it to the cache', async () => {
      const createTeamDto: CreateTeamDto = {
        name: 'Team B',
        abbr: 'B',
        city: 'City B',
        stadium: 'Stadium B',
      };
      const existingTeams: TeamDto[] = [
        {
          id: 1,
          name: 'Team A',
          abbr: 'A',
          city: 'City A',
          stadium: 'Stadium A',
        },
      ];
      const newTeam: TeamDto = {
        id: 2,
        ...createTeamDto,
      };

      jest.spyOn(cacheManager, 'get').mockResolvedValue(existingTeams);
      jest.spyOn(cacheManager, 'set').mockResolvedValue(newTeam);

      const result = await service.createTeam(createTeamDto);
      expect(result).toEqual(newTeam);
      expect(cacheManager.set).toHaveBeenCalledWith('teams', [
        ...existingTeams,
        newTeam,
      ]);
    });
  });
});
