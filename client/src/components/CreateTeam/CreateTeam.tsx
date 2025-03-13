import { useState } from 'react'
import Input from './Input'

const CreateTeam = () => {
    return (
        <>
            <h3>Add a New Team</h3>
            <h6>Fill in details to add new team</h6>
            <form>
                <Input fieldName='name' placeholder='name' value='Che' error={false} errorText=''/>
                <Input fieldName='city' placeholder='city' value='' error={true} errorText='This error'/>
                <button>CREATE</button>
            </form>
        </>
    )
}

export default CreateTeam