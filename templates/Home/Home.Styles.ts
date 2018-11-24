module.exports = `import { createStyles, Theme } from '@material-ui/core';

const spin = {
    'from': {
        transform: 'rotate(0deg)'
    },

    'to': {
        transform: 'rotate(360deg)'
    }
};

export const styles = (theme: Theme) =>
    createStyles({
        '@keyframes spin': spin,
        app: {
            textAlign: 'center'
        },
        appHeader: {
            backgroundColor: '#222',
            color: 'white',
            height: 150,
            padding: 20
        },
        appIntro: {
            fontSize: 'large'
        },
        appLogo: {
            height: 80
        },
        appTitle: {
            fontSize: '1.5em'
        },
        'spin': {
            animationDuration: '20s',
            animationIterationCount: 'infinite',
            animationName: 'spin',
            animationTimingFunction: 'linear'
        }
    });`