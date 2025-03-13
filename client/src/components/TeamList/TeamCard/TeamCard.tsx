import React from 'react'
import { Team } from '../../../types/team'
import './TeamCard.css'

const TeamCard: React.FC<Team> = ({name, stadium, abbr, city}) => {
    return (
        <div className='team-card'>
            <p>{name}</p>
            <p>{stadium}</p>
            <p>{abbr}</p>
            <p>{city}</p>
        </div>
    )
}

export default TeamCard