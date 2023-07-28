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
        showError: ''
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
            if( payload.payload === 'La clave de ingreso es incorrecta' ) state.showError = payload.payload;
            if( payload.payload === 'El usuario no esta autorizado' ) state.loginError = payload.payload;
            if( payload.payload === 'El password no es correcto' ) state.loginError = payload.payload;
            if( payload.payload === 'El documento no esta registrado' ) state.loginError = payload.payload;
            if( payload.payload === '' ) {
                state.showError = payload.payload;
                state.loginError = payload.payload;
            }
        }
    }
});



export const { inLogin,inLogout,enter,errorMessage,changeAccess } = authSlice.actions;
