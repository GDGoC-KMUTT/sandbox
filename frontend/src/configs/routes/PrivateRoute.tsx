import { useAtom } from "jotai"
import { authAtom } from "../../stores/authAtom"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const [authState] = useAtom(authAtom)
    if (authState.loading === true) {
        return <div>Loading...</div>
    }

    return authState.isAuthenticated ? element : <Navigate to="/login" replace />
}

export default PrivateRoute
