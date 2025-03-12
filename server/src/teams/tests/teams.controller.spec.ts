import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from '../teams.controller';
import { TeamsService } from '../teams.service';
import { TeamDto } from '../dto/team.dto';

describe('TeamsController', () => {
  let teamsController: TeamsController;
  let teamsService: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        {
          provide: TeamsService,
          useValue: {
            getTeams: jest.fn(),
            createTeam: jest.fn(),
          },
        },
      ],
    }).compile();

    teamsController = module.get<TeamsController>(TeamsController);
    teamsService = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(teamsController).toBeDefined();
  });

  describe('getTeams', () => {
    it('should return an array of teams', async () => {
      const result: TeamDto[] = [
        {
          id: 1,
          name: 'Test Team',
          abbr: 'TTT',
          city: 'Test City',
          stadium: 'Test Stadium',
        },
      ];
      jest.spyOn(teamsService, 'getTeams').mockResolvedValue(result);

      expect(await teamsController.getTeams()).toBe(result);
    });
  });
});
