import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { router } from "./configs/routes/routes"
import { useAuthInit } from "./utils/authInit"
import { useEffect } from "react"

const queryClient = new QueryClient()

function App() {
    const initializeAuth = useAuthInit()

    useEffect(() => {
        console.log("Initializing auth state")
        initializeAuth() // Initialize auth state on app start
    }, [initializeAuth])

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {router.map((item) => (
                        <Route key={item.path} element={item.element} path={item.path} />
                    ))}
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
