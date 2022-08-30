import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PlaylistDetail from './commponent/PlaylistDetail'
import Song from './commponent/Song'
//引入移动端适配
import "lib-flexible";
ReactDOM.render(
     <Router>
      <Switch>
        <Route path="/song" component={Song} />
        <Route path="/playlist" component={PlaylistDetail} />
        <Route component={App} />
      </Switch>
    </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
