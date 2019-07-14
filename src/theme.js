import { createMuiTheme } from '@material-ui/core/styles'

const palette = {
  primary: { main: '#4A148C' },
  secondary: { main: '#B3E5FC' },
  background: {
    default: '#FFFFFF'
  }
}
const typography = {
  h1: {
    fontSize: 36,
    paddingBottom: 10
  },
  useNextVariants: true
}
const themeName = 'Persian Indigo French Pass Fly'

export default createMuiTheme({
  palette, themeName, typography
})
