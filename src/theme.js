import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#4A148C' },
  secondary: { main: '#B3E5FC' }
};
const themeName = 'Persian Indigo French Pass Fly';

export default createMuiTheme({ palette, themeName, typography: {
    useNextVariants: true,
  }, });
