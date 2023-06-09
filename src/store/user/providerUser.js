import { userApi } from "../../api/userApi";

export const create = async(user) => {
    try {
        const { document,name,cost,dateStart } = user;
        const dateEnd = finalDate( dateStart, cost );
        const dataSave = { document,name,cost,dateStart,dateEnd };
        const resp = await userApi.post( '/auth/new', dataSave ); 
        return { resp: resp.data }
    } catch (error) {
        return { resp: error.response.data }
    }
}

export const update = async(user) => {
    try {
        let { document,name,cost,startDate,endDate } = user.values;
        endDate = finalDate( startDate, cost );
        const dataSave = { document, name, cost, dateStart:startDate, dateEnd:endDate };
        const resp = await userApi.put( `/auth/update/${user.id}`, dataSave ); 
        return { resp: resp.data }
    } catch (error) {
        return { resp: error.response.data }
    }
}

export const getAll = async(page,limit,filter) => {
    try {
        const resp = await userApi.get(`/auth/consult?page=${page}&limit=${limit}&name=${filter.name}&date=${filter.date || ''}`); 
        return { resp: resp.data }
    } catch (error) {
        return { resp: error.response.data }
    }
}

export const destroy = async(id) => {
    try {
        const resp = await userApi.get(`/auth/destroy/${id}`); 
        return { resp: resp.data }
    } catch (error) {
        return { resp: error.response.data }
    }
}


const finalDate = (date, addDays) => {
    const days = {'5.000' : 1, '11.000': 8, '21.000' : 15 ,'38.000': 30 }
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days[addDays]);
    return newDate;
}
