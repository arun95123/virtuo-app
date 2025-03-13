import { useState } from 'react'
import TeamList from './components/TeamList'
import CreateTeam from './components/CreateTeam'
import './App.css'

const App = () => {
  const [currentTab, setTab] = useState<'view' | 'create'>('view')

  return (
    <>
      <h1>View and Manage Teams</h1>
      <div className='toggler'>
        <div 
          className={`toggler--option ${currentTab === 'view' ? 'toggler--option--selected' : ''}`}
          onClick={() => setTab('view')}
        >
          View
        </div>
        <div 
          className={`toggler--option ${currentTab === 'create' ? 'toggler--option--selected' : ''}`}
          onClick={() => setTab('create')}
        >
          Create
        </div>
      </div>
      <div className='content'>
        {currentTab === 'view' ? <TeamList /> : <CreateTeam />}
      </div>
    </>
  )
}

export default App
