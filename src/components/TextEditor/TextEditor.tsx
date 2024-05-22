import cls from './TextEditor.module.css'
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addNote, editNote, selectActiveNote, selectActiveNoteNotUnique, selectIsEditing, setActiveNoteNotUniqueToFalse} from "../../app/notesSlice.ts";
import {Note} from "../../types";
import Quill from "../Quill/Quill.tsx";

const TextEditor = () => {
    const dispatch = useAppDispatch()
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [titleEmpty, setTitleEmpty] = useState(false);

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
        if(!title) {
            dispatch(setActiveNoteNotUniqueToFalse())
            return setTitleEmpty(true)
        } else setTitleEmpty(false)
        isEditing
            ? dispatch(editNote({text: text, title: title}))
            : dispatch(addNote({text: text, title: title}))
    }

    const closeHandler = () => {
        setTitleEmpty(false)
        document.querySelector('main')?.classList.add('hide')
    }

    return (
        <div className={cls.editor}>
            <div className={cls.buttonsBlock}>
                <button onClick={saveHandler}>Сохранить</button>
                <button onClick={closeHandler}>Закрыть</button>
                {titleEmpty && <span>Введите заголовок</span>}
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
            <Quill value={text} onChange={handleTextChange}/>
        </div>
    );
};

export default TextEditor;
