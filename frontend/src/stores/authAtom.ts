import { atom } from "jotai"
import { AuthState } from "../types/authType"

export const authAtom = atom<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
})

export const tokenAtom = atom<string>("")
