import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Interface } from "../api/interface";

interface State {
    initialized: boolean,
    gold: number,
}

interface Action {
    updateBalance(api: Interface): Promise<void>
    getBalance(api: Interface): Promise<{
        gold: number,
    }>
}

const initialState: State = {
    initialized: false,
    gold: 0,
}
export const useBalanceStore = create<State & Action>()(
    devtools(
        (set, get): State & Action => ({
            ...initialState,
            async updateBalance(api: Interface) {
                const balance = await api.CurrentBalance()

                set({ initialized: true, gold: balance.gold })
            },
            async getBalance(api: Interface): Promise<{
                gold: number,
            }> {
                if (!get().initialized) {
                    await get().updateBalance(api)
                }
                return {
                    gold: get().gold,
                }
            }
        })
    )
)
export default useBalanceStore
