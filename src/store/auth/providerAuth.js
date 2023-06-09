import { userApi } from "../../api/userApi";

export const getInto = async(user) => {
    try {
        const resp = await userApi.post( '/auth/login', user );
        return { resp: resp.data }
    } catch (error) {
        return { resp: error.response.data }
    }
}

export const toAccess = async(document) => {
    try {
        const resp = await userApi.post( '/auth/access', document );
        return { resp: resp.data }
    } catch (error) {
        return { resp: error.response.data }
    }
}

// export const validateToken = async() => {
//     try {
//         const resp = await userApi.get( '/auth/renew' );
//         return { resp: resp.data }
//     } catch (error) {
//         return { resp: error.response.data }
//     }
// }
