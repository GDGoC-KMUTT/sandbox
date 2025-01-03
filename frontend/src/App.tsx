import { BrowserRouter, Route, Routes } from "react-router-dom"

import { router } from "./configs/routes/routes.tsx"
import { useAuthInit } from "./utils/authInit"
import { useEffect } from "react"

function App() {
    const initializeAuth = useAuthInit()

    useEffect(() => {
        initializeAuth()
    }, [initializeAuth])

    return (
        <BrowserRouter>
            <Routes>
                {router.map((item) => (
                    <Route key={item.path} element={item.element} path={item.path} />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default App
