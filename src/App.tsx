import './App.css'
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import Main from "./components/Main/Main.tsx";
import {useEffect} from "react";

function App() {

    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if(darkModeQuery.matches) document.body.className = 'app_dark_theme';
        const handleRefresh = () => {
                document.querySelector("body")?.classList.toggle('app_dark_theme')
        };

        darkModeQuery.addEventListener('change', handleRefresh);

        return () => {
            darkModeQuery.removeEventListener('change', handleRefresh);
        };
        // localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, []);

    return (
        <>
            <Sidebar/>
            <Main/>
        </>
        )
    }

export default App
