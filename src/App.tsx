import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthRequired, Sidebar } from 'components'
import Staking from 'pages/Staking/Staking'
import Profile from 'pages/Profile/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Staking />} />
          <Route
            path="/profile"
            element={<AuthRequired element={<Profile />} />}
          />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
