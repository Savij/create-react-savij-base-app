module.exports = `import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { ButtonProps } from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import WorkIcon from '@material-ui/icons/Work';
import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import { theme } from '../Theme';
import { styles } from './AppHost.Styles';

export default withStyles(styles)(class AppHost extends React.Component<WithStyles<typeof styles>, {}> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className={classes.appFrame}>
                        <div className={classes.appBarContainer}>
                            <AppBar position='static'>
                                <Toolbar>
                                    <WorkIcon className={classes.appIcon} />
                                    <Typography variant='h6' color='inherit' noWrap={true} className={classes.grow}>
                                        My App Title
                                    </Typography>
                                    <Button
                                        color='inherit'
                                        component={Link as React.ReactType<ButtonProps>}
                                        {...{ to: '/home' }}>Routed Page</Button>
                                </Toolbar>
                            </AppBar>
                        </div>
                        <main className={classes.content}>
                            <div className={classes.scrollContainer}>
                                <Switch>
                                    <Route exact={true} path='/' component={Home} />
                                    <Route exact={true} path='/home' component={Home} />
                                </Switch>
                            </div>
                        </main>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
});`