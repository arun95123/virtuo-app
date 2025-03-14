import { vi, describe, it, expect } from 'vitest'
import { getTeams, createTeam } from './teamService';
import axios from 'axios';

vi.mock('axios');

describe('getTeams', () => {
    it('should return teams data when API call is successful', async () => {
        const mockTeams = [{ id: 1, name: 'Team A' }, { id: 2, name: 'Team B' }];
        vi.mocked(axios, true).get.mockResolvedValue({ data: mockTeams });

        const result = await getTeams();

        expect(result).toStrictEqual({
            isSuccess: true,
            data: mockTeams
        });
    });

    it('should return isSuccess false when API call fails', async () => {
        vi.mocked(axios, true).get.mockRejectedValue(new Error('Network Error'));

        const result = await getTeams();

        expect(result.isSuccess).toBe(false);
    });
});
describe('createTeam', () => {
    it('should return created team data when API call is successful', async () => {
        const formData = { name: 'Team A', abbr: 'TEA', city: 'London', stadium: 'Stamford' };
        const mockTeam = { id: 1, ...formData };
        vi.mocked(axios, true).post.mockResolvedValue({ data: mockTeam });

        const result = await createTeam(formData);

        expect(result).toStrictEqual({
            isSuccess: true,
            data: mockTeam
        });
    });

    it('should return isSuccess false when API call fails', async () => {
        const formData = { name: 'Team A', abbr: 'TEA', city: 'London', stadium: 'Stamford' };
        vi.mocked(axios, true).post.mockRejectedValue(new Error('Network Error'));

        const result = await createTeam(formData);

        expect(result.isSuccess).toBe(false);
    });
});