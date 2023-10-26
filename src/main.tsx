import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from "react-redux"
import { store } from "./app/store"
import ThemeProvider from "./app/ThemeProvider.tsx";
import {setTheme} from "./app/helpers";
import {THEME_LOCALSTORAGE_KEY} from "./app/const";
import {ThemeType} from "./types";

const userTheme = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeType
userTheme && setTheme(userTheme)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider initialTheme={userTheme}>
            <App />
        </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
