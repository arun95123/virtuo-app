import { useEffect, useState } from "react"

import { getTeams } from "../../services/teamService"
import { Team } from "../../types/team"
import TeamCard from "./TeamCard"

const TeamList = () => {

    const [teams, setTeams] = useState<Team[]>([])
    const [isLoading, setLoading] = useState<boolean>(false)
    //Error Bounday Component
    const [isError, setError] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        const getData = async () => {
          const response = await getTeams()
          if (response.isSuccess) {
            setTeams(response.data.teams)
          } else {
            setError(true)
          }
          setLoading(false)
        }

        getData()
      }, [])

    if(isLoading) {
        return <div>LOADING</div>
    }

    if(isError) {
        return <div>ERROR</div>
    }
    
    return (
        <>
            {teams.map((team) => (
                <TeamCard key={team.id} {...team}/>
            ))}
        </>

    )
}

export default TeamList