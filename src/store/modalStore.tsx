import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
    isOpen: boolean
    header: string
    body: string
}

interface Action {
    onClose(): void
    newAlert(header: string, body: string): void
}

const initialState: State = {
    isOpen: false,
    header: "Астрологи предсказали!",
    body: "Ретроградный Марс не позволит увеличить добычу руды. Цены на руду выросли.",
}
export const useModalStore = create<State & Action>()(
    devtools(
        (set, get): State & Action => ({
            ...initialState,
            onClose() {
                set({ isOpen: false })
            },
            newAlert(header, body) {
                set({
                    isOpen: true,
                    header: header,
                    body: body
                })
            },
        })
    )
)
export default useModalStore
