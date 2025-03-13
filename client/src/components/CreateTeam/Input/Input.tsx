import React from 'react'

interface InputProps {
    fieldName: string
    placeholder: string
    value: string
    error: boolean
    errorText: string
}

const Input:React.FC<InputProps> = ({fieldName, placeholder, value, error, errorText}) => {
    return (
        <div>
            <label htmlFor={fieldName}>{fieldName}</label>
            <input
                id={fieldName}
                placeholder={placeholder}
                name={fieldName}
                value={value}
            />
            {error && <div className='input--error'>{errorText}</div>}
        </div>
    )

}

export default Input