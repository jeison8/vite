import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        // for get all
        users: [],
        rows: 0,
        page: 0,
        totalDocs: 0,
        //for create
        id: '',
        document: '',
        name: '',
        password: '',
        cost: '',
        dateStart: null,
        dateEnd: null,
        // for general error 
        error: '',
        status: false,
    },
    reducers: {
        getUsers: ( state, { payload } ) => {
            state.users = payload.users.docs;
            state.rows = payload.users.limit;
            state.totalDocs = payload.users.totalDocs;
        },
        createUserSuccess: ( state, { payload } ) => {
            state.document = '';
            state.name = '';
            state.password = '';
            state.cost = '';
            state.dateStart = null;
            state.dateEnd = null;
            state.status = true;
        },
        updateUserSuccess: ( state, { payload } ) => {
            state.status = payload;
        },
        removeUser: ( state, { payload } ) => {
            state.users = state.users.filter( user => user._id !== payload.user._id );
        },
        setStatus: ( state, { payload } ) => {
            state.status = payload;
        },
        setUpdateMessage: ( state, { payload } ) => {
            state.updateMessage = payload;
        },
        setUpdate: ( state, { payload } ) => {
            state.id = payload._id;
            state.document = payload.document;
            state.name = payload.name;
            state.cost = payload.cost;
            state.dateStart = payload.dateStart;
        },
        errorMessage: ( state, { payload } ) => {
            state.error = payload;
        }
    }
});

export const { getUsers,createUserSuccess,removeUser,setStatus,setUpdate,updateUserSuccess,setUpdateMessage,errorMessage } = userSlice.actions;
