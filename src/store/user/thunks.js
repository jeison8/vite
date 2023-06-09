import { create, update, getAll, destroy } from './providerUser'
import { getUsers, createUserSuccess, removeUser, errorMessage, updateUserSuccess } from './userSlice'

export const createUser = (user) => { 
    return async(dispatch) => {
        const result = await create(user);
        if (!result.resp.ok) {
            dispatch(errorMessage(result.resp.message));
        }else{
            dispatch(createUserSuccess(result.resp));
        }
    }
}

export const updateUser = (user) => { 
    return async(dispatch) => {
        const result = await update(user);
        if (!result.resp.ok) {
            dispatch(errorMessage(result.resp.message));
        }else{
            dispatch(updateUserSuccess(result.resp.ok));
        }
    }
}

export const getAllUsers = (page,limit,filter) => { 
    return async(dispatch) => {
        const result = await getAll(page,limit,filter);
        if (!result.resp.ok) {
            dispatch(errorMessage(result.resp.message));
        }else{
            dispatch(getUsers(result.resp));
        }
    }
}

export const destroyUser = (id) => { 
    return async(dispatch) => {
        const result = await destroy(id);
        if (!result.resp.ok) {
            dispatch(errorMessage(result.resp.message));
        }else{
            dispatch(removeUser(result.resp));
        }
    }
}



