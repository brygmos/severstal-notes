import cls from './TextEditor.module.css'
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addNote, selectActiveNote} from "../../app/notesSlice.ts";
import {Note} from "../../types";
// import ReactQuill from 'react-quill';

const TextEditor = () => {
    const dispatch = useAppDispatch()
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');

    const note: Note = useAppSelector(selectActiveNote)

    useEffect(() => {
        setText(note.text)
        setTitle(note.title)
    }, [note])

    const handleTitleChange = (value: React.FormEvent<HTMLInputElement>) => {
        setTitle(value.currentTarget.value);
        // dispatch(setActive({title: value.currentTarget.value, text: text}))
    };
    const handleTextChange = (value: React.FormEvent<HTMLTextAreaElement>) => {
        setText(value.currentTarget.value);

    };

    const clear = () => {
        setText('');
        setTitle('');
    };

    const saveHandler = () => {
        dispatch(addNote({text: text, title: title}))
        // dispatch(cleanActive())
        clear()
    }

    const saveDisabled = !text || !title || (text == note.text && title == note.title)

    return (
        <div className={cls.editor}>
            <div className={cls.buttonsBlock}>
                <button onClick={saveHandler} disabled={saveDisabled}>Сохранить</button>
            </div>
            <input
                className={cls.title}
                value={title}
                // value={note.title}
                type={"text"}
                placeholder='Название'
                onChange={handleTitleChange}
                autoFocus
            />
            <textarea
                className={cls.textArea}
                value={text}
                // value={note.text}
                placeholder='Текст'
                onChange={handleTextChange}
            />
        </div>
    );
};

export default TextEditor;
