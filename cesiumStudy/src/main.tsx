import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { ErrorBoundary } from './component/error/ErrorBoundary';
import App from './App';
const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(container!); // createRoot(container!) if you use TypeScript

// 定义当前项目的路由模式

root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <App />
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
