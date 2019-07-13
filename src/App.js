import './App.css'
import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import ParticleViewer from './components/ParticleViewer/ParticleViewer'
import theme from './theme'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <ParticleViewer />
      </MuiThemeProvider>
    )
  }
}

export default App
