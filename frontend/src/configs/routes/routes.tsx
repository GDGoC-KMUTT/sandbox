import React from "react"
import { Navigate, RouteObject } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import NotFound from "../pages/NotFound"
import Login from "../../pages/login/Login"
import Callback from "../../pages/callback/Callback"

const ROUTES: Record<string, any> = import.meta.glob("/src/pages/**/[a-z[]*.tsx", { eager: true })

const routes: RouteObject[] = Object.keys(ROUTES)
    .filter((item) => item.endsWith(".tsx"))
    .map((route) => {
        const path = route
            .replace(/\/src\/pages|\.tsx$/g, "")
            .replace(/\/index$/, "")
            .replace(/\[\.{3}([^\]]+)\]/g, "*")
            .replace(/\[([^\]]+)\]/g, ":$1")
            .replace("/private", "")

        const Element = ROUTES[route].default

        const isPrivate = route.includes("private")

        return {
            path,
            element: isPrivate ? React.createElement(PrivateRoute, { element: React.createElement(Element) }) : React.createElement(Element),
        }
    })

export const router = [
    ...routes,
    { path: "/", element: <Navigate to="/login" /> },
    { path: "/login", element: <Login /> },
    { path: "/callback", element: <Callback /> },
    { path: "*", element: <NotFound /> },
]
