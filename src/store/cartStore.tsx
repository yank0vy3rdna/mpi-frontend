import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

interface State {
    cart: { [id: number]: number }
}

interface Action {
    addToCart(unitId: number): void

    removeFromCart(unitId: number): void
    clearCart(): void
}

const initialState: State = {
    cart: {},
}
export const useCartStore = create<State & Action>()(
    devtools(
        persist(
            (set, get): State & Action => ({
                ...initialState,
                addToCart(unitId: number) {
                    const cart = get().cart
                    if (Object.keys(cart).indexOf(String(unitId)) === -1) {
                        cart[unitId] = 1
                    } else {
                        cart[unitId] = cart[unitId] + 1
                    }
                    set({
                        cart: {
                            ...cart,
                        }
                    })
                },
                clearCart() {
                    set({cart: {}})
                },
                removeFromCart(unitId: number) {
                    if (Object.keys(get().cart).indexOf(String(unitId)) === -1) {
                        return
                    }
                    const cart = get().cart
                    if (get().cart[unitId] > 1) {
                        cart[unitId] = cart[unitId] - 1
                    } else {
                        delete cart[unitId]
                    }
                    set({
                        cart: {
                            ...cart,
                        }
                    })
                }
            }), {
                partialize: (state) => ({
                    cart: state.cart,
                }),
                name: "cartStore"
            }
        )
    )
)
export default useCartStore