module.exports = `import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppHost from './AppHost/AppHost';
import { Stores } from './Stores/Stores';

export default class App extends React.Component {
    private stores = Stores.Instance;
    public componentWillMount() {
        library.add(faThumbsUp);
    }
    public render() {
        return (
            <BrowserRouter>
                <Provider {...this.stores}>
                    <AppHost />
                </Provider>
            </BrowserRouter>
        );
    }
}`
