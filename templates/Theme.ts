module.exports = `import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#039be5'
        },
        secondary: {
            main: '#bdbdbd'
        }
    },
    typography: {
        useNextVariants: true
    }
});`