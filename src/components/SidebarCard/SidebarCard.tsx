import cls from './SidebarCard.module.css'
import {Note} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {removeNote, setActive, setRemoved} from "../../app/notesSlice.ts";
import {useState} from "react";

type Props = {
    note: Note
}

const SidebarCard = (props: Props) => {
    const {note} = props
    const [deleted, setDeleted] = useState(false);

    const dispatch = useAppDispatch()

    const clickCardHandler = () => {
        !deleted && dispatch(setActive({text: note.text, title: note.title}))
    }

    const removeNoteHandler = (e: React.MouseEvent) => {
        dispatch(removeNote({text: note.text, title: note.title}))
        dispatch(setActive({text: '', title: ''}))
        // if (deleted) { setDeleted(false); e.stopPropagation(); return }
        // dispatch(setRemoved(note))
        // setDeleted(true)
        e.stopPropagation()
    }

    return (
        <section className={deleted ? cls.sidebarCard + ' ' + cls.deleted : cls.sidebarCard} onClick={clickCardHandler}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
                <button className={deleted ? cls.iconButton + ' ' + cls.deleted_icon : cls.iconButton} onClick={(e) => {removeNoteHandler(e)}}>
                    {deleted
                        ?
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 15L9 13M9 13L11 11M9 13H13C14.1046 13 15 13.8954 15 15V16M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M4 6H20M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        :
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    }
                </button>


        </section>
    );
};

export default SidebarCard;
