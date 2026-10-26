//import { validateNumber } from 'vuetify/lib/components/VCalendar/util/timestamp''
import Axios from'./caller.service'



let getAllOptions =(formData ) => {
    return Axios.get('/api/options', formData)
}
let getOptions =(productId) => {
    return Axios.get(`/api/options/${productId} `)
}
let updateOption=(id, payload, config) =>{
  // 🎯 Ensure the forward slash / is present before the template literal variable ${id}
  return Axios.put(`/api/options/${id}`, payload, config);
}
let createOptions =(payload, config) => {
    return Axios.post('/api/options', payload, config)
}

let deleteOptions =(id, config) => {
     return Axios.delete(`/api/options/${id}`, config);
}

export const optionService ={
    getAllOptions,
    getOptions,
    updateOption,
    createOptions,
    deleteOptions,
}