import {initialState} from './initialState';
import { createSlice, nanoid } from "@reduxjs/toolkit";

const publicationsSlice = createSlice({
    name: "publications",
    initialState: initialState.publications,
    redusers: {
        addPublication: {
            reducer(state, action) {
                state.push(action.payload);
            }
        },
        prepare(item) {
            return {
                payload: {
                    item,
                    id: nanoid(5),
                },
            };
        }
    }
})

export const { addPublication} = publicationsSlice.actions;
export const publicationsReducer = publicationsSlice.reducer;