import cls from './Sidebar.module.css'
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {cleanActive, selectNotes} from "../../app/notesSlice.ts";
import {Note} from "../../types";
import SidebarCard from "../SidebarCard/SidebarCard.tsx";
import {useEffect} from "react";
import {NOTES_LOCALSTORAGE_KEY, THEME_LOCALSTORAGE_KEY} from "../../app/const";
import {getTheme, setTheme} from "../../app/helpers";

const Sidebar = () => {
    const dispatch = useAppDispatch()

    const notes: Note[] = useAppSelector(selectNotes)

    useEffect(() => {
        return () => {
            localStorage.setItem(NOTES_LOCALSTORAGE_KEY, JSON.stringify(notes))
        }
    }, [])

    const addHandler = () => {
        dispatch(cleanActive())
        document.querySelector('main')?.classList.remove('hide')
    }

    const toggleTheme = () => {
        setTheme()
        localStorage.setItem(THEME_LOCALSTORAGE_KEY, getTheme())
    }

    return (
        <aside className={cls.sidebar}>
            <h2>Мои заметки</h2>
            <div className={cls.buttonsBlock}>
                <button onClick={addHandler} className={cls.addButton} aria-label="add note">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12H18M12 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button onClick={toggleTheme} className={cls.addButton} aria-label="change theme">
                    <svg width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 26C21.523 26 26 21.523 26 16C26 10.477 21.523 6 16 6C10.477 6 6 10.477 6 16C6 21.523 10.477 26 16 26ZM16 24.5V7.5C18.2543 7.5 20.4163 8.39553 22.0104 9.98959C23.6045 11.5837 24.5 13.7457 24.5 16C24.5 18.2543 23.6045 20.4163 22.0104 22.0104C20.4163 23.6045 18.2543 24.5 16 24.5Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
            {notes && notes.map((note) => <SidebarCard key={note.title} note={note}/>)}

        </aside>
    );
};

export default Sidebar;
