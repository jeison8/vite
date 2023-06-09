import { inLogin, enter, errorMessage } from './authSlice';
import { getInto, toAccess } from './providerAuth';

export const login = (user) => { 
    return async(dispatch) => {
        const result = await getInto(user);
        if ( result.resp.ok ) {
            localStorageSet(result.resp);
            dispatch( inLogin(result.resp));
        } else{
            dispatch( errorMessage( result.resp.message ) );
        }
    }
}

export const access = (document) => { 
    return async(dispatch) => {
        const result = await toAccess(document);
        if ( !result.resp.ok ) {
            dispatch( errorMessage( result.resp.message ) );
        } else {
            dispatch( enter(result.resp));
        }
    }
}

const localStorageSet = (state) => {
    localStorage.setItem('token', state.token);
    localStorage.setItem('name', state.name);
}

// export const tokenValidate = () => { 
//     return async(dispatch) => {
//         const result = await validateToken();
//         if ( !result.resp.ok ) {
//             // dispatch( errorMessage( result.resp.message ) );
//         } else {
//             // dispatch( outside('in'));
//         }
//     }
// }


