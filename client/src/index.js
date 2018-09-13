import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import MusicPadContainer from './containers/MusicPadContainer.js'


ReactDOM.render(
    <Provider store={store}>
        <MusicPadContainer/>
    </Provider>, 
    document.getElementById('root'));
