import {mockApi} from "./mock";
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

    Register(email: string, username: string, password: string): Promise<string>

    Couriers(): Promise<CouriersResponse>

    CloseOrder(orderId: string): Promise<void>

    HireCourier(orderId: string, courierId: number): Promise<void>

    CouriersOrder(): Promise<CourierOrdersResponse>

    AnswerOrder(orderId: number, answer: boolean): Promise<void>

    CreateCourierAccount(email: string, username: string, password: string, price: number, pictureUrl: string): Promise<void>
}

interface Order {
    id: number,
    status: string,
    courier: Courier | null,
    orderTime: string,
    lat: number,
    lon: number,
    orderUnits: { unitId: number, count: number }[],
}

export interface OrdersResponse {
    orders: Order[]
}

export interface Courier {
    id: number,
    pictureUrl: string
    name: string,
    price: number
}

export interface CouriersResponse {
    couriers: Courier[]
}

export interface CourierOrdersResponse {
    order: Order | null,
}

export interface MakeAnOrderResponse {
    success: boolean,
    courier: Courier | null,
    orderId: number
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

export interface RegisterRequest {
    username: string
    password: string
    email: string
}

export interface LoginResponse {
    token: string
}

const useMockAPI = false
export default function useApi(): Interface {
    const token = useTokenStore(state => state.token)
    if (useMockAPI){
        return new mockApi()
    }
    return new Api(token)
}

export function MakeApiFromLocalStorage(): Interface {
    if (useMockAPI){
        return new mockApi()
    }
    let tokenStore = window.localStorage.getItem("tokenStore")
    if (tokenStore === null) {
        tokenStore = "{}"
    }
    const token = JSON.parse(tokenStore).state.token
    return new Api(token)
}