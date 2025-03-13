import axios from 'axios'
import { TeamsResponse, Team } from "../types/team";

export async function getTeams(): Promise<TeamsResponse>{
    try {
        //TODO move to env
        const response = await axios.get<Team[]>('http://localhost:3000/api/teams')
        return {
            isSuccess: true,
            data: {
                teams: response.data
            }
        }
    }catch(err){
        console.error(err)
        return {
            isSuccess: false,
        }
    }
}