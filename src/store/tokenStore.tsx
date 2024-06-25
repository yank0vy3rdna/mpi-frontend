import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {Interface} from "../api/interface";

interface State {
    token: string
    isAuthenticated: boolean
}

interface Action {
    logout(): void

    login(api: Interface, username: string, password: string): void

    register(api: Interface, email: string, username: string, password: string): void
}

const initialState: State = {
    token: "",
    isAuthenticated: false,
}
export const useTokenStore = create<State & Action>()(
    devtools(
        persist(
            (set, get): State & Action => ({
                ...initialState,
                logout() {
                    set({...initialState})
                },
                async login(api: Interface, username: string, password: string) {
                    const token = await api.Login(username, password)
                    set({token: token, isAuthenticated: true})
                },
                async register(api: Interface, email: string, username: string, password: string) {
                    const token = await api.Register(email, username, password)
                    set({token: token, isAuthenticated: true})
                }
            }), {
                partialize: (state) => ({
                    token: state.token,
                    isAuthenticated: state.isAuthenticated
                }),
                name: "tokenStore"
            }
        )
    )
)
export default useTokenStore