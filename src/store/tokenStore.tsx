import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";
import API from "../api/api";

interface State {
    token: string
    isAuthenticated: boolean
}

interface Action {
    logout(): void

    login(username: string, password: string): void
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
                async login(username: string, password: string) {
                    const token = await API.Login(username, password)
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