import axios from 'axios'
import { ApiResponse, Team, TeamForm } from "../types/team";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export async function getTeams(): Promise<ApiResponse<Team[]>>{
    try {
        const response = await axios.get<Team[]>(`${apiBaseUrl}/api/teams`)
        console.log('API RESPONSE', response)
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
        const response = await axios.post<Team>(`${apiBaseUrl}/api/teams`, formData)
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