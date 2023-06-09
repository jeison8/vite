import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        nameClass: 'layout-static',
        firtsName: ''
    },
    reducers: {
        toggle: ( state, { payload } ) => {
            state.nameClass = payload;
        },
        setName: ( state, { payload } ) => {
            state.firtsName = payload;
        }
    }
});

export const { toggle, setName } = menuSlice.actions;
