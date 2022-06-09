import { useState } from 'react'
import logo from './assets/logo.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px'}}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </header>
    </div>
  )
}

export default App
