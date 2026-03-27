import './App.css'
import Head from './component/head'
import Quiz from './component/quiztest'
import Responden from './component/responden'
import { useState } from 'react'

function App() {
  const [viewq, setViewQ] = useState(true)
  const [viewr, setViewR] = useState(false)

  const autoView = () => setViewQ(true)

  return (
    <div className='w-screen flex items-center flex-col justify-center'>
      <Head 
        setViewQ={setViewQ}
        setViewR={setViewR}
        autoView={autoView}
      />

      {viewr && <Responden />}
      {viewq && <Quiz />}
    </div>
  )
}

export default App
