import { describe, it, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import "@testing-library/jest-dom"
import App from './App'

describe('App', () => {
  it('displays "View and Manage Teams" heading', () => {
    render(<App />)
    expect(screen.getByText('View and Manage Teams')).toBeInTheDocument()
  })

  it('toggles between "View" and "Create" tabs', () => {
    render(<App />)
    
    const viewTab = screen.getByText('View')
    const createTab = screen.getByText('Create')
    
    // Initially, the "View" tab should be selected
    expect(viewTab).toHaveClass('toggler--option--selected')
    expect(createTab).not.toHaveClass('toggler--option--selected')
    expect(screen.getByText('Team List')).toBeInTheDocument()

    
    // Click on the "Create" tab
    act(() => {
      createTab.click()
    })
    
    // Now, the "Create" tab should be selected
    expect(createTab).toHaveClass('toggler--option--selected')
    expect(viewTab).not.toHaveClass('toggler--option--selected')
    expect(screen.getByText('Create Team')).toBeInTheDocument()
  })
})