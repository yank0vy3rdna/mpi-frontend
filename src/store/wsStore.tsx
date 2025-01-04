import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
    connected: boolean
    socket: WebSocket | null
    handlers: { [messageType: string]: (data: any) => void }
    lostMessages: { [messageType: string]: any }
    timerId: number | null
    astroCallback: () => void
}

interface Action {
    openWebSocketConnection(token: string): void
    closeConnection(): void
    registerMessageHandler(messageType: string, handler: (data: any) => void): void
    deregisterMessageHandler(messageType: string): void
    registerAstroCallback(handler: () => void): void
}

const initialState: State = {
    socket: null,
    connected: false,
    handlers: {},
    lostMessages: {},
    timerId: null,
    astroCallback: () => { }
}
export const useWSStore = create<State & Action>()(
    devtools(
        (set, get): State & Action => ({
            ...initialState,
            registerAstroCallback(handler) {
                set({ astroCallback: handler })
            },
            deregisterMessageHandler(messageType) {
                if (Object.keys(get().handlers).indexOf(messageType) === -1) {
                    return
                }

                const handlers = { ...get().handlers }

                delete handlers[messageType]

                set({ handlers: handlers })

                console.info("handler deregistered", messageType)
            },
            registerMessageHandler(messageType: string, handler: (data: any) => void): void {
                if (Object.keys(get().handlers).indexOf(messageType) !== -1) {
                    return
                }
                const handlers = { ...get().handlers }

                handlers[messageType] = handler

                set({ handlers: handlers })

                console.info("handler registered", messageType)
                const lostMessages = { ...get().lostMessages }
                if (Object.keys(lostMessages).indexOf(messageType) !== -1) {
                    const data = lostMessages[messageType]
                    delete lostMessages[messageType]
                    set({ lostMessages: lostMessages })
                    setTimeout(() => { handler(data) })
                }
            },
            closeConnection: () => {
                const socket = get().socket
                if (socket === null) {
                    return
                }
                const timerId = get().timerId
                if (timerId !== null) {
                    clearInterval(timerId)
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
                        const lostMessages = { ...get().lostMessages }
                        lostMessages[data.messageType] = data.data
                        set({ lostMessages: lostMessages })

                        return
                    }
                    handlers[data.messageType](data.data)
                    get().astroCallback()

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
