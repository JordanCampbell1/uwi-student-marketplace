import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import {createRoot} from 'react-dom/client';
import {createStore,combineReducers} from 'redux'
import { User } from './utils/reducers';
import { AuthTokens } from './utils/reducers';
const allReducers=combineReducers({User,AuthTokens})


// const root = ReactDOM.createRoot(document.getElementById('root'));

const store=createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const rootElement=document.getElementById('root')
const root=createRoot(rootElement)

root.render(
  
  <React.StrictMode>
      <Provider store={store}>
      <App/>
      </Provider> 
  </React.StrictMode>
)
