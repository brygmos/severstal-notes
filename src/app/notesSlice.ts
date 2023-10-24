import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import {Note} from "../types";
// import { fetchCount } from "./counterAPI"

export interface NotesState {
    notes: Note[],
    activeNoteContent: Note,
    activeNoteIndex: number,
}

const initialState: NotesState = {
    notes: [
        {
            title: 'My first Note!',
            text: 'Text of the note'
        }
    ],
    activeNoteContent: {
        title: '',
        text: ''
    },
    activeNoteIndex: 0,
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
            state.notes.push(action.payload)
            // state.activeNoteContent = {title: '', text: ''}
            // cleanActive()
        },
        setActive: (state, action: PayloadAction<Note>) => {
            state.activeNoteContent = action.payload
        },
        cleanActive: (state) => {
            state.activeNoteContent = {title: '', text: ''}
        },
        removeNote: (state, action: PayloadAction<Note>) => {
            state.notes = state.notes.filter((note) => {
                return note.title !== action.payload.title
            })
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
    removeNote
} = notesSlice.actions
export const selectNotes = (state: RootState) => state.notes.notes
export const selectActiveNote = (state: RootState) => state.notes.activeNoteContent

// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//         (dispatch, getState) => {
//             const currentValue = selectNotes(getState())
//             if (currentValue % 2 === 1) {
//                 dispatch(incrementByAmount(amount))
//             }
//         }

export default notesSlice.reducer
