import 'babel-polyfill';
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import routers from './routers/routers';
import reducers from './reducer/index';
import './index.less';
import './font.less';

const store = createStore(reducers,compose(
  applyMiddleware(thunk)
  // ,
  // (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() 
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
       <Switch>
         {routers.map(v=>(
          <Route key={v.path} path={v.path} exact={v.exact} component={v.component} />
         ))}
       </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);
serviceWorker.unregister();
