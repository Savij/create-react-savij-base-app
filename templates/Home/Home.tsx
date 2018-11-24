module.exports = `import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { HomeStore } from 'src/Stores/HomeStore';
import logo from '../logo.svg';
import { styles } from './Home.Styles';

interface IProps extends WithStyles<typeof styles> {
    homeStore?: HomeStore;
}
export default withStyles(styles)(inject('homeStore')(observer(class Home extends React.Component<IProps, {}> {

    private textChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.props.homeStore!.textChange(event.target.value);
    }

    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.app}>
                <header className={classes.appHeader}>
                    <img src={logo} className={classNames(classes.appLogo, classes.spin)} alt='logo' />
                    <h1 className={classes.appTitle}>Welcome to React</h1>
                </header>
                <p className={classes.appIntro}>
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
                <input type='text' value={this.props.homeStore!.textValue} onChange={this.textChange} />
            </div>
        );
    }
})));`
