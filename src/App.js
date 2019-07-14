import './App.css'
import { MuiThemeProvider } from '@material-ui/core/styles'
import ParticleViewer from './components/ParticleViewer/ParticleViewer'
import React from 'react'
import theme from './theme'


/**
 * The main react component that represents the application
 */
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ParticleViewer />
    </MuiThemeProvider>
  )
}

export default App
