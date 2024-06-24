import { useState } from 'react'
/*import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import './App.css'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Indicator from './components/Indicator';

function App() {
  const [] = useState(0)

  return (

    <Grid container spacing={5}>
	      <Grid xs={12} sm={4} md={3} lg={2}>1</Grid>
	      <Grid xs={6} sm={4} md={3} lg={2}>2</Grid>
	      <Grid xs={6} sm={4} md={3} lg={2}>3</Grid>
	      <Grid xs={12} sm={4} md={3} lg={2}>4</Grid>
	      <Grid xs={6} sm={4} md={6} lg={2}>5</Grid>
	      <Grid xs={6} sm={4} md={6} lg={2}>6</Grid>
        <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	    </Grid>
   /* <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>*/
  )
}

export default App
