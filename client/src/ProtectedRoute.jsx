import {Navigate, Outlet} from 'react-router-dom';
import { useAuth } from "./context/AuthContext"

//Proteger rutas
function ProtectedRoute() {

    const { loading, isAuthenticated } = useAuth()

    //muestra el estado de carga y si está autenticado
    //console.log(loading, isAuthenticated) 

    if (loading) {
        return <h1>Loading</h1>
    }
    if  (!loading && !isAuthenticated) return <Navigate to='/login' replace/> //replace ya no vuelve a la ruta anterior

    return (
        <Outlet/>//continua con el componente que está adentro
    )
}

export default ProtectedRoute
