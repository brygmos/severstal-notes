import {ReactNode, useEffect} from 'react';
import {THEME_LOCALSTORAGE_KEY} from "./const";
import {ThemeType} from "../types";
import {setTheme} from "./helpers";

type ThemeProviderProps = {
    initialTheme?: ThemeType;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const {initialTheme, children} = props

    useEffect(() => {
        const userTheme = localStorage.getItem(THEME_LOCALSTORAGE_KEY);
        if(userTheme) return;

        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const modeQuery = darkModeQuery.matches ? ThemeType.DARK : ThemeType.LIGHT
        const resultTheme: ThemeType = initialTheme ? initialTheme : modeQuery

        setTheme(resultTheme)
        const handleRefresh = () => {
            setTheme(resultTheme)
        };

        darkModeQuery.addEventListener('change', handleRefresh);
        return () => {
            darkModeQuery.removeEventListener('change', handleRefresh);
        };
    }, []);

    return children;
};

export default ThemeProvider;
