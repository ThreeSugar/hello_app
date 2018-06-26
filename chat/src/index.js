import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Chat from './components/chat';
import NavBar from './components/nav';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<NavBar/>, document.getElementById('nav'));
ReactDOM.render(<Chat />, document.getElementById('root'));
registerServiceWorker();
