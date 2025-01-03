import { BrowserRouter, Route, Routes } from "react-router-dom"

import { router } from "./configs/routes/routes.tsx"
import { useAuthInit } from "./utils/authInit"
import { useEffect } from "react"
import ToastProvider from "./components/ui/ToastProvider.tsx"

function App() {
    const initializeAuth = useAuthInit()

    useEffect(() => {
        initializeAuth()
    }, [initializeAuth])

    return (
        <BrowserRouter>
            <ToastProvider>
                <Routes>
                    {router.map((item) => (
                        <Route key={item.path} element={item.element} path={item.path} />
                    ))}
                </Routes>
            </ToastProvider>
        </BrowserRouter>
    )
}

export default App
