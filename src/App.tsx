import './App.css'
import Sidebar from "./components/Sidebar/Sidebar.tsx";
import Main from "./components/Main/Main.tsx";
import {useEffect} from "react";

function App() {

    useEffect(() => {
        document.body.className = 'app_dark_theme';
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
