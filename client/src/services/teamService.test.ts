import { vi, describe, it, expect } from 'vitest'
import { getTeams } from './teamService';
import axios from 'axios';
import { TeamsResponse } from '../types/team';

vi.mock('axios');

describe('getTeams', () => {
    it('should return teams data when API call is successful', async () => {
        const mockTeams = [{ id: 1, name: 'Team A' }, { id: 2, name: 'Team B' }];
        vi.mocked(axios, true).get.mockResolvedValue({ data: mockTeams });

        const result: TeamsResponse = await getTeams();

        expect(result).toStrictEqual({
            isSuccess: true,
            data: {
                teams: mockTeams
            }
        });
    });

    it('should return isSuccess false when API call fails', async () => {
        vi.mocked(axios, true).get.mockRejectedValue(new Error('Network Error'));

        const result: TeamsResponse = await getTeams();

        expect(result.isSuccess).toBe(false);
    });
});