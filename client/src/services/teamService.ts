import axios from 'axios'
import { ApiResponse, Team, TeamForm } from "../types/team";

export async function getTeams(): Promise<ApiResponse<Team[]>>{
    try {
        //TODO move to env
        const response = await axios.get<Team[]>('http://localhost:3000/api/teams')
        return {
            isSuccess: true,
            data: response.data
        }
    }catch(err){
        console.error(err)
        return {
            isSuccess: false,
        }
    }
}

export async function createTeam(formData: TeamForm): Promise<ApiResponse<Team>>{
    try {
        //TODO move to env
        const response = await axios.post<Team>('http://localhost:3000/api/teams', formData)
        return {
            isSuccess: true,
            data: response.data   
        }
    }catch(err){
        console.error(err)
        return {
            isSuccess: false,
        }
    }
}