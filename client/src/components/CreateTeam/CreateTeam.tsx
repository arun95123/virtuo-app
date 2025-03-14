import React, { useState } from 'react'
import Input from './Input'
import { TeamForm } from '../../types/team'
import { createTeam } from '../../services/teamService'
import './CreateTeam.css'

interface CreateTeamProps {
    onTeamCreation: () => void
    setToastContent: (content: string) => void
}

const CreateTeam:React.FC<CreateTeamProps> = ({ onTeamCreation, setToastContent }) => {
    const [formData, setFormData] = useState<TeamForm>({
        name: '',
        city: '',
        abbr: '',
        stadium: ''
    })
    const [errors, setErrors] = useState<TeamForm>({
        name: '',
        city: '',
        abbr: '',
        stadium: ''
    })
    const [isSubmitting, setSubmitting] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when field is edited
        if (errors[name as keyof TeamForm]) {
          setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<TeamForm> = {};
        let isValid = true;
    
        if (!formData.name.trim()) {
          newErrors.name = 'Team name is required';
          isValid = false;
        }
    
        if (!formData.city.trim()) {
          newErrors.city = 'City is required';
          isValid = false;
        }
    
        if (!formData.abbr.trim()) {
          newErrors.abbr = 'Abbreviation is required';
          isValid = false;
        } else if (formData.abbr.length !== 3) {
          newErrors.abbr = 'Abbreviation must be exactly 3 characters';
          isValid = false;
        }
    
        if (!formData.stadium.trim()) {
          newErrors.stadium = 'Stadium is required';
          isValid = false;
        }
    
        setErrors({ ...errors, ...newErrors });
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!validateForm()) return
        setSubmitting(true)
        const response = await createTeam(formData)
        setSubmitting(false)
        if(response.isSuccess){
            onTeamCreation()
            setToastContent('Team created Successfully')
        }else {
            setToastContent('Error creating Team')
        }
    }

    return (
        <div className='team-form'>
            <div>Add a New Team</div>
            <div>Fill in details to add new team</div>
            <form onSubmit={ handleSubmit }>
                <Input 
                    fieldName='name'
                    label='Name'
                    onchange={handleChange}
                    placeholder='name'
                    value={formData.name}
                    error={errors.name} 
                />
                <Input
                    fieldName='abbr'
                    label='Abbr'
                    onchange={handleChange}
                    placeholder='abbr'
                    value={formData.abbr}
                    error={errors.abbr}
                />
                <Input
                    fieldName='city'
                    label='City'
                    onchange={handleChange}
                    placeholder='city'
                    value={formData.city}
                    error={errors.city}
                />
                <Input
                    fieldName='stadium'
                    label='Stadium'
                    onchange={handleChange}
                    placeholder='stadium'
                    value={formData.stadium}
                    error={errors.stadium}
                />
                <button type='submit' disabled={isSubmitting} >CREATE</button>
            </form>
        </div>
    )
}

export default CreateTeam