import cls from './Sidebar.module.css'
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectNotes, setActive} from "../../app/notesSlice.ts";
import {Note} from "../../types";
import SidebarCard from "../SidebarCard/SidebarCard.tsx";
import {useEffect} from "react";
import {NOTES_LOCALSTORAGE_KEY} from "../../app/const";
import editorCls from '../TextEditor/TextEditor.module.css'

const Sidebar = () => {
    const dispatch = useAppDispatch()

    const notes: Note[] = useAppSelector(selectNotes)

    useEffect(() => {
        return () => {
            localStorage.setItem(NOTES_LOCALSTORAGE_KEY, JSON.stringify(notes))
        }
    }, [])

    const addHandler = () => {
        dispatch(setActive({text: '', title: ''}))
        document.querySelector('.' + editorCls.editor)?.classList.remove('hide')
    }

    return (
        <aside className={cls.sidebar}>
            <h2>Мои заметки</h2>
            <button onClick={addHandler} className={cls.addButton}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12H18M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            {notes && notes.map((note) => <SidebarCard key={note.title} note={note}/>)}

        </aside>
    );
};

export default Sidebar;
