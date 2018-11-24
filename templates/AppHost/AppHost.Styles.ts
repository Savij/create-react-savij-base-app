module.exports = `import { createStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) =>
    createStyles({
        appBar: {
            marginLeft: '0px'
        },
        appBarContainer: {
            flexGrow: 1
        },
        appFrame: {
            zIndex: 1
        },
        appIcon: {
            marginRight: '20px'
        },
        content: {
            backgroundColor: theme.palette.grey[300],
            flexGrow: 1
        },
        grow: {
            flexGrow: 1
        },
        root: {
            flexGrow: 1,
            height: '100%'
        },
        scrollContainer: {
            flexGrow: 1,
            height: 'calc(100vh - 64px)',
            overFlowY: 'auto',
            overflowX: 'hidden'
        },
        toolbar: theme.mixins.toolbar
    });`