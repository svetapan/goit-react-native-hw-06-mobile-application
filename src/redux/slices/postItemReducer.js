import { initialState } from '../initialState';
import { createSlice, nanoid } from "@reduxjs/toolkit";

const postItemSlice = createSlice({
    name: "publications",
    initialState: initialState.postsList,
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

export const { addPublication} = postItemSlice.actions;
export const postItemReducer = postItemSlice.reducer;