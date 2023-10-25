import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import {Note} from "../types";
import {NOTES_LOCALSTORAGE_KEY} from "./const";
import cls from "../components/TextEditor/TextEditor.module.css";
// import { fetchCount } from "./counterAPI"

export interface NotesState {
    notes: Note[],
    activeNoteContent: Note,
    activeNoteIndex: number,
    activeNoteNotUnique: boolean,
}

function initNotes () {
    const initialNotes = [
        {
            title: 'My first Note!',
            text: 'Text of the note'
        }
    ]

    const notesLocal = localStorage.getItem(NOTES_LOCALSTORAGE_KEY);

    if(notesLocal) return JSON.parse(notesLocal);
    return initialNotes
}

const initialState: NotesState = {
    notes: initNotes(),
    activeNoteContent: {
        title: '',
        text: ''
    },
    activeNoteIndex: 0,
    activeNoteNotUnique: false
}

// export const incrementAsync = createAsyncThunk(
//     "counter/fetchCount",
//     async (amount: number) => {
//         const response = await fetchCount(amount)
//         // The value we return becomes the `fulfilled` action payload
//         return response.data
//     },
// )

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            const title = state.notes.filter((note) => note.title === action.payload.title).length
            if (!title) {
                state.notes.push(action.payload)
                localStorage.setItem(NOTES_LOCALSTORAGE_KEY, JSON.stringify(state.notes))
                state.activeNoteContent = {title: '', text: ''}
                state.activeNoteNotUnique = false
                document.querySelector('.' + cls.editor)?.classList.add('hide')
            } else state.activeNoteNotUnique = true
        },
        setActive: (state, action: PayloadAction<Note>) => {
            state.activeNoteContent = action.payload
            state.activeNoteNotUnique = false
        },
        cleanActive: (state) => {
            state.activeNoteContent = {title: '', text: ''}
        },
        removeNote: (state, action: PayloadAction<Note>) => {
            state.notes = state.notes.filter((note) => {
                return note.title !== action.payload.title
            })
            localStorage.setItem(NOTES_LOCALSTORAGE_KEY, JSON.stringify(state.notes))
            state.activeNoteContent = {title: '', text: ''}
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(incrementAsync.pending, (state) => {
    //             state.status = "loading"
    //         })
    //         .addCase(incrementAsync.fulfilled, (state, action) => {
    //             state.status = "idle"
    //             state.value += action.payload
    //         })
    //         .addCase(incrementAsync.rejected, (state) => {
    //             state.status = "failed"
    //         })
    // },
})

export const {
    addNote,
    setActive,
    cleanActive,
    removeNote,
} = notesSlice.actions
export const selectNotes = (state: RootState) => state.notes.notes
export const selectActiveNote = (state: RootState) => state.notes.activeNoteContent
export const selectActiveNoteNotUnique = (state: RootState) => state.notes.activeNoteNotUnique

// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//         (dispatch, getState) => {
//             const currentValue = selectNotes(getState())
//             if (currentValue % 2 === 1) {
//                 dispatch(incrementByAmount(amount))
//             }
//         }

export default notesSlice.reducer
