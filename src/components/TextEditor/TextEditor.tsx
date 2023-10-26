import cls from './TextEditor.module.css'
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addNote, editNote, selectActiveNote, selectActiveNoteNotUnique, selectIsEditing} from "../../app/notesSlice.ts";
import {Note} from "../../types";
import Quill from "../Quill/Quill.tsx";

const TextEditor = () => {
    const dispatch = useAppDispatch()
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    const note: Note = useAppSelector(selectActiveNote)
    const notUniqueTitle: boolean = useAppSelector(selectActiveNoteNotUnique)
    const isEditing: boolean = useAppSelector(selectIsEditing)

    useEffect(() => {
        setText(note.text)
        setTitle(note.title)
    }, [note])

    const handleTitleChange = (value: React.FormEvent<HTMLInputElement>) => {
        setTitle(value.currentTarget.value);
    };
    const handleTextChange = (value: string) => {
        setText(value);
    };

    const saveHandler = () => {
        isEditing
            ? dispatch(editNote({text: text, title: title}))
            : dispatch(addNote({text: text, title: title}))
    }

    const closeHandler = () => {
        document.querySelector('.' + cls.editor)?.classList.add('hide')
    }

    const saveDisabled = !text || !title || (text == note.text && title == note.title)

    return (
        <div className={cls.editor}>
            <div className={cls.buttonsBlock}>
                <button onClick={saveHandler} disabled={saveDisabled}>Сохранить</button>
                <button onClick={closeHandler}>Закрыть</button>
                {notUniqueTitle && <span>Такое название уже существует</span>}
                {!notUniqueTitle && <span className={cls.dummy}></span>}
            </div>
            <input
                className={cls.title}
                value={title}
                type={"text"}
                placeholder='Название'
                onChange={handleTitleChange}
                autoFocus
            />
            <Quill value={text} onChange={handleTextChange} className={cls.textArea}/>
        </div>
    );
};

export default TextEditor;
