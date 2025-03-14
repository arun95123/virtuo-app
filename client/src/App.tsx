import { useState, useRef } from 'react'
import TeamList from './components/TeamList'
import CreateTeam from './components/CreateTeam'
import './App.css'

const App = () => {
  const [currentTab, setTab] = useState<'view' | 'create'>('view')
  const [toast, setToast] = useState<string>('')
  const [showToast, setShowToast] = useState(false)
  const timer = useRef<NodeJS.Timeout>(null)


  const setToastContent = (content: string) => {
    setToast(content)
    setShowToast(true)
    if(timer.current){
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      setShowToast(false)
    }, 2000)
    
  }

  const onTeamCreation = () => {
    setTab('view')
  }

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
        {currentTab === 'view' ? <TeamList /> : <CreateTeam onTeamCreation={onTeamCreation} setToastContent={setToastContent}/>}
      </div>
      {showToast ? <div className='toast'>{toast}</div> : <></>}
    </>
  )
}

export default App
