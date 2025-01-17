import { useAtom } from "jotai"
import { authAtom } from "../../stores/authAtom"
import { Navigate } from "react-router-dom"
import PageLoading from "../../components/loader/PageLoading"

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const [authState] = useAtom(authAtom)
    if (authState.loading === true) {
        return <PageLoading />
    }

    return authState.isAuthenticated ? element : <Navigate to="/login" replace />
}

export default PrivateRoute
