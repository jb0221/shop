import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // Provider에 써줘서 store.js에 있는 state 전부 사용 가능
    <Provider store={store}>    
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider> 
  // </React.StrictMode>     // useEffect 2번 실행되는 거 막으려면 삭제
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
