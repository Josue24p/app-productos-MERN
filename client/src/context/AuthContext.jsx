import { createContext, useContext, useEffect, useState } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

//vamos a guardar el createContext en AuthContext que tendrá todas las funciones de CreateContext
export const AuthContext = createContext()

//vamos a crear un hook, para no exportar userContext, sino este useAuth ya va ser el uso del contexto, lo guardamos en la const contexto, validamos si existe, si en caso no, retorna el contexto creado
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

//vamos a crear un Provider componente que va a englobar a otros
//recibe un elemento hijo
export const AuthProvider = ({ children }) => {
    //creamos un estado  para poder controlar los datos del usuario en la aplicación
    const [user, setUser] = useState(null);

    //si ya tenemos un usuario también le debemos decir a las otras paginas que ya estamos autenticados
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //Cuando hay un error ya sé que hay un response, eso lo vamos a leer esa respuesta y lo vamos a guardar en un estado
    const [errors, setErrors] = useState([])

    //como no lee el usuario ni si está autenticado vamos a colocar un estado de carga un Loading
    const [loading, setLoading] = useState(true)



    //función registrar va recibir un usuario, recibe los datos res.data lo vamos asignar en setUser
    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data);
            setUser(res.data)
            //si el usuario se registra y todo va bien el Authenticated es true
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data)
        }
    }

    //para login
    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    //crear función logout
    const logout = async () =>{
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    }
    //función pa eliminar los mensajes de error pasado un tiempo
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer) //destruimos el timeOut si ya no lo usa
        }
    }, [errors])



    //si carga la aplicación vamos hacerle una consulta al backend mediante una cookie
    //instalar npm i js-cookie para leer las cookies del front-end
    useEffect(() => {
        async function checkLogin() {
            //primero consigue el token del navegador
            const cookies = Cookies.get()
            //comprueba si el token existe entonces la autenticación es falso, no hay usuario, no está cargando
            if (!cookies.token) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false)
                return
            }

            try {
                //si hay un token verificalo, vas a enviar desde cookies el token que haz encontrado, si hay un token envialo al backend, si te responde es ok, sino te responde no está autenticado ni está cargando, pero si existe todo ok, si hay error muestralo
                const res = await verifyTokenRequest(cookies.token)
                //console.log(res)
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false)
                    return
                } else {
                    setIsAuthenticated(true)
                    setUser(res.data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }

        }
        checkLogin()
    }, [])
    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                logout,
                loading,
                user,
                isAuthenticated,
                errors,
            }}>
            {children}
        </AuthContext.Provider>
    )
}