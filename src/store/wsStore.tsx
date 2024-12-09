import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
    connected: boolean
    socket: WebSocket | null
    handlers: { [messageType: string]: (data: any) => void }
    timerId: number | null
}

interface Action {
    openWebSocketConnection(token: string): void
    closeConnection(): void
    registerMessageHandler(messageType: string, handler: (data: any) => void): void
}

const initialState: State = {
    socket: null,
    connected: false,
    handlers: {},
    timerId: null
}
export const useWSStore = create<State & Action>()(
    devtools(
        (set, get): State & Action => ({
            ...initialState,
            registerMessageHandler(messageType: string, handler: (data: any) => void): void {
                if (Object.keys(get().handlers).indexOf(messageType) !== -1) {
                    alert("handler already exist")
                    return
                }
                set({ handlers: { ...get().handlers, messageType: handler } })
            },
            closeConnection: () => {
                const socket = get().socket
                if (socket === null) {
                    return
                }
                socket.close()
            },
            openWebSocketConnection: (token: string) => {
                if (get().socket !== null) {
                    return
                }
                console.log("trying to connect to ws", token)
                const socket = new WebSocket(`ws://${window.location.host}/api/ws?token=${token}`);

                set({ socket: socket })
                socket.addEventListener('open', () => {
                    set({ connected: true });
                    console.log("connected to ws successfully", token)
                });
                socket.addEventListener('message', (event) => {
                    const data = JSON.parse(event.data)
                    const handlers = get().handlers
                    if (Object.keys(handlers).indexOf(data.messageType) === -1) {
                        console.error("handler not found", data.messageType)
                    }
                    handlers[data.messageType](data.data)

                });
                socket.addEventListener('close', () => {
                    set({ socket: null, connected: false });
                    console.log("disconnected from ws", token)
                });
                socket.onerror = (event) => {
                    console.error("ws error, closing socket: ", event)
                    const socket = get().socket
                    if (socket === null) {
                        return
                    }
                    socket.close()
                    const timerId = get().timerId
                    if (timerId !== null) {
                        clearInterval(timerId)
                    }
                    set({
                        timerId: window.setInterval(() => {
                            console.log("trying to reconnect to ws", token)
                            get().openWebSocketConnection(token)
                        }, 3000),
                    })
                }
            },
        })
    )
)
export default useWSStore
