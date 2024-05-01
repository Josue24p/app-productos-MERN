import axios from './axios';

/* Crea un RegisterRequest, te van a pasar un usuario,
vas a enviar una petición post a /register, con el usuario
que nos están pasando */
export const registerRequest = user => axios.post('/auth/signup', user);

export const loginRequest = user => axios.post('/auth/signin', user) 

export const verifyTokenRequest = () => axios.get('/auth/verify');