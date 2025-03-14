import React from 'react'
import './Input.css'

interface InputProps {
    fieldName: string
    label: string
    placeholder: string
    value: string
    error: string
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input:React.FC<InputProps> = ({fieldName, label, placeholder, value, error, onchange}) => {
    return (
        <div className={`form-input ${error ? 'form-input--error' : ''}`}>
            <label htmlFor={fieldName}>{label}</label>
            <input
                id={fieldName}
                placeholder={placeholder}
                name={fieldName}
                value={value}
                onChange={onchange}
            />
            {error && <div className='input--error'>{error}</div>}
        </div>
    )

}

export default Input