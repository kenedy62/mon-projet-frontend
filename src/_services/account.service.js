import Axios from'./caller.service'



let login =(credentials ) => {
    return Axios.post('/api/auth/login', credentials)
}

let lagout=() => {
    localStorage.removeItem('token')
}
let getToken = (token) => {
    return localStorage.getItem('token', token)
}
let saveToken =(token) => {
     localStorage.setItem('token', token)
}
let islogged = () => {
    let token = localStorage.getItem('token')
    return !! token
}
let getSettings = () => {
    return Axios.get('/api/admin/settings')
}
let updateSettings = ( email ,whatsappNumber) => {
    return  Axios.put('/api/admin/settings', email, whatsappNumber)
}
export const accountService ={
    login,
    lagout,
    saveToken,
    getToken,
    islogged,
    getSettings,
    updateSettings
}