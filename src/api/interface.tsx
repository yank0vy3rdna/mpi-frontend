import useTokenStore from "../store/tokenStore";
import {Api} from "./api";

export interface Interface {
    Login(username: string, password: string): Promise<string>

    Units(): Promise<UnitsResponse>

    UnitById(id: number): Promise<UnitDetails>

    MakeAnOrder(cart: { [id: number]: number },
                latitude: number,
                longitude: number
    ): Promise<MakeAnOrderResponse>

    Orders(): Promise<OrdersResponse>
}

export interface OrdersResponse {
    orders: {
        id: number,
        status: string,
        orderTime: string,
        orderUnits: { unitId: number, count: number }[],
    }[]
}

export interface MakeAnOrderResponse {
    success: boolean
}

export interface MakeAnOrderRequest {
    orderUnits: { unitId: number, count: number }[],
    latitude: number,
    longitude: number
}

export interface Unit {
    id: number
    name: string
    pictureUrl: string
    count: number
    price: number
}

export interface UnitDetails {
    id: number
    name: string
    pictureUrl: string
    description: string
    count: number
    price: number
}

export interface UnitsResponse {
    units: Unit[]
}

export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    token: string
}

// export const API: Interface = new mockApi()


export default function useApi(): Interface {
    const token = useTokenStore(state => state.token)
    return new Api(token)
}

export function MakeApiFromLocalStorage(): Interface {
    let tokenStore = window.localStorage.getItem("tokenStore")
    if (tokenStore === null) {
        tokenStore = "{}"
    }
    const token = JSON.parse(tokenStore).state.token
    return new Api(token)
}