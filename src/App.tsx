import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sidebar } from 'components'
import Staking from 'pages/Staking/Staking'

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Staking />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App
