import Axios from './caller.service'

let getAllProduits = (formData) => {
    return Axios.get('/api/stuff', formData)
}

let getTopProduct = () => {
    // CORRECTION : Ajout du / au début
    return Axios.get('/api/stuff/top-product');
}

let getProduit = (productId) => {
    // CORRECTION : Suppression de l'espace vide après ${productId}
    return Axios.get(`/api/stuff/${productId}`)
}

let updateProduit = (id, formData) => {
    // CORRECTION : Ajout du / au début
    return Axios.put(`/api/stuff/${id}`, formData);
}

let createThing = (formData) => {
    return Axios.post('/api/stuff', formData)
}

let createThingIm = (images) => {
    return Axios.post('/images', images)
}

let deleteProduit = (id) => {
    // CORRECTION : Ajout du / au début
    return Axios.delete(`/api/stuff/${id}`)
}

let getDashboardStats = () => {
    return Axios.get('/api/dashboard/stats');
}

export const produitService = {
    getAllProduits,
    getTopProduct,
    getProduit,
    updateProduit,
    createThing,
    createThingIm,
    deleteProduit,
    getDashboardStats
}
