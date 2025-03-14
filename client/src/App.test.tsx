import { describe, it, expect, vi } from 'vitest'
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom"
import App from './App'
import axios from 'axios';

vi.mock('axios');

describe('App', () => {
  it('displays "View and Manage Teams" heading', () => {
    render(<App />)
    expect(screen.getByText('View and Manage Teams')).toBeInTheDocument()
  })

  it('toggles between "View" and "Create" tabs', () => {
    render(<App />)
    
    const viewTab = screen.getByText('View')
    const createTab = screen.getByText('Create')
    screen.debug()
    // Initially, the "View" tab should be selected
    expect(viewTab).toHaveClass('toggler--option--selected')
    expect(createTab).not.toHaveClass('toggler--option--selected')

    
    // Click on the "Create" tab
    act(() => {
      createTab.click()
    })
    
    // Now, the "Create" tab should be selected
    expect(createTab).toHaveClass('toggler--option--selected')
    expect(viewTab).not.toHaveClass('toggler--option--selected')
    expect(screen.getByText('Add a New Team')).toBeInTheDocument()
  })

  it('displays returned teams', async () => {
    const mockTeams = [{ id: 1, name: 'Team A', stadium: 'Stamford', abbr: 'TEA', city: 'london' }];
    vi.mocked(axios, true).get.mockResolvedValue({ data: mockTeams });
    await act(async () => {
      render(<App />);
    });
    await waitFor(() => {
      expect(screen.getByText('Team A (TEA)')).toBeInTheDocument()
      expect(screen.getByText('City: london')).toBeInTheDocument()
      expect(screen.getByText('Stadium: Stamford')).toBeInTheDocument()
    });
  })

  it('creates a team and move to view tab', async () => {
    const mockTeams = [{ id: 1, name: 'Team A', stadium: 'Stamford', abbr: 'TEA', city: 'london' }];
    vi.mocked(axios, true).get.mockResolvedValue({ data: mockTeams });
    vi.mocked(axios, true).post.mockResolvedValue({ data: mockTeams[0] });
    await act(async () => {
      render(<App />);
    });
    const createTab = screen.getByText('Create')
    act(() => {
      createTab.click()
    })
    const inputName = screen.getByLabelText('Name')
    const inputAbbr = screen.getByLabelText('Abbr')
    const inputStadium = screen.getByLabelText('Stadium')
    const inputCity = screen.getByLabelText('City')
    fireEvent.change(inputName, {target: {value: 'some'}})
    fireEvent.change(inputAbbr, {target: {value: 'som'}})
    fireEvent.change(inputStadium, {target: {value: 'some'}})
    fireEvent.change(inputCity, {target: {value: 'some'}})
    const createButton = screen.getByText('CREATE')
    act(() => {
      createButton.click()
    })
    await waitFor(() => {
      expect(screen.getByText('Team A (TEA)')).toBeInTheDocument()
      expect(screen.getByText('City: london')).toBeInTheDocument()
      expect(screen.getByText('Stadium: Stamford')).toBeInTheDocument()
    });
   })

})