import React from 'react'
import { Team } from '../../../types/team'
import './TeamCard.css'

const TeamCard: React.FC<Team> = ({name, stadium, abbr, city}) => {
    return (
        <div className='team-card'>
            <b>{`${name} (${abbr})`}</b>
            <p>City: {city}</p>
            <p>Stadium: {stadium}</p>
        </div>
    )
}

export default TeamCard