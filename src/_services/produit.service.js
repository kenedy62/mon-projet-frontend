//import { validateNumber } from 'vuetify/lib/components/VCalendar/util/timestamp''
import Axios from'./caller.service'



let getAllProduits =(formData ) => {
    return Axios.get('/api/stuff', formData)
}
// Inside your frontend produit.service.js file:
let getTopProduct=()=> {
  return Axios.get('api/stuff/top-product');
}

let getProduit =(productId) => {
    return Axios.get(`/api/stuff/${productId} `)
}
let updateProduit =(id,formData) => {
    //return Axios.put('/api/stuff/:_id' +formData._id, formData)
    return Axios.put(`api/stuff/${id}`, formData);
}
let createThing =(formData) => {
    return Axios.post('/api/stuff', formData)
}
let createThingIm =(images) => {
    return Axios.post('/images', images)
}
let deleteProduit =(id) => {
    return Axios.delete(`api/stuff/${id}`)
}
let getDashboardStats=() =>{
    return Axios.get('/api/dashboard/stats');
}
export const produitService ={
    getAllProduits,
    getTopProduct,
    getProduit,
    updateProduit,
    createThing,
    createThingIm,
    deleteProduit,
    getDashboardStats
}