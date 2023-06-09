import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        //login
        uid: '',
        firtsname: '',
        token: localStorage.getItem('token') || '',
        //consult
        access: {},
        //erros
        loginError: '',
    },
    reducers: {
        //login
        inLogin: ( state, { payload } ) => {
            state.uid = payload.uid;
            state.firtsname = payload.name;
            state.token = payload.token;
        },
        inLogout: ( state ) => {
            state.uid = '';
            state.firtsname = '';
            state.token = '';
        },
        //consult
        enter: ( state, { payload } ) => {
            state.access = payload;
        },
        changeAccess(state, { payload }){
            state.access = payload;
        },
        // errors
        errorMessage: ( state, payload ) => {
            if( payload.type === 'auth/errorMessage' ) state.loginError = payload.payload;
        }
    }
});



export const { inLogin,inLogout,enter,errorMessage,changeAccess } = authSlice.actions;
