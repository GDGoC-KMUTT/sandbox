import React from "react"
import { RouteObject } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import NotFound from "../pages/NotFound"
import Login from "../../pages/login/Login"

const ROUTES: Record<string, any> = import.meta.glob("/src/pages/**/[a-z[]*.tsx", { eager: true })

const routes: RouteObject[] = Object.keys(ROUTES)
    .filter((item) => item.endsWith(".tsx"))
    .map((route) => {
        const path = route
            .replace(/\/src\/pages|\.tsx$/g, "")
            .replace(/\/index$/, "")
            .replace(/\[\.{3}([^\]]+)\]/g, "*")
            .replace(/\[([^\]]+)\]/g, ":$1")

        const Element = ROUTES[route].default

        const isPrivate = route.includes("private") // Example: Mark "private" folder as restricted

        return {
            path,
            element: isPrivate ? React.createElement(PrivateRoute, { element: React.createElement(Element) }) : React.createElement(Element),
        }
    })

export const router = [...routes, { path: "/login", element: React.createElement(Login) }, { path: "*", element: React.createElement(NotFound) }]
