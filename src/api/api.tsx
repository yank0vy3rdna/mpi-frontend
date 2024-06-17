import {
    Interface,
    LoginRequest,
    LoginResponse, MakeAnOrderRequest,
    MakeAnOrderResponse,
    OrdersResponse,
    UnitDetails,
    UnitsResponse
} from "./interface";
import axios from "axios";

export class Api implements Interface {
    baseApiPath = "/api"

    async Login(username: string, password: string): Promise<string> {
        const req: LoginRequest = {
            username: username,
            password: password
        }
        const response = await axios.post<LoginResponse>(`${this.baseApiPath}/auth`, req, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.data.token
    }

    async MakeAnOrder(cart: { [id: number]: number },
                      latitude: number,
                      longitude: number): Promise<MakeAnOrderResponse> {
        const req: MakeAnOrderRequest = {
            orderUnits: [],
            latitude: latitude,
            longitude: longitude
        }
        req.orderUnits = Object.keys(cart).map((unitId) => {
            return {
                unitId: Number(unitId),
                count: cart[Number(unitId)]
            }
        })
        const response = await axios.post<MakeAnOrderResponse>(`${this.baseApiPath}/orders/new`, req, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.data
    }

    async Orders(): Promise<OrdersResponse> {
        const resp = await axios.get<OrdersResponse>(`${this.baseApiPath}/orders`)
        return resp.data
    }

    async Units(): Promise<UnitsResponse> {
        const resp = await axios.get<UnitsResponse>(`${this.baseApiPath}/units`)
        return resp.data
    }

    async UnitById(id: number): Promise<UnitDetails> {
        const resp = await axios.get<UnitDetails>(`${this.baseApiPath}/units/${id}`)
        return resp.data
    }
}
export default Api