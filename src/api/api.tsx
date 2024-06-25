import {
    CourierOrdersResponse,
    CouriersResponse,
    Interface,
    LoginRequest,
    LoginResponse, MakeAnOrderRequest,
    MakeAnOrderResponse,
    OrdersResponse, RegisterRequest,
    UnitDetails,
    UnitsResponse
} from "./interface";
import axios from "axios";

export class Api implements Interface {
    baseApiPath = "/api"
    token = ""

    constructor(token: string) {
        this.token = token
    }

    async Login(username: string, password: string): Promise<string> {
        const req: LoginRequest = {
            username: username,
            password: password
        }
        const response = await axios.post<LoginResponse>(`${this.baseApiPath}/auth/login`, req, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.data.token
    }

    async Register(email: string, username: string, password: string): Promise<string> {
        const req: RegisterRequest = {
            username: username,
            password: password,
            email: email
        }
        const response = await axios.post<LoginResponse>(`${this.baseApiPath}/auth/register`, req, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return response.data.token
    }

    async CouriersOrder(): Promise<CourierOrdersResponse> {
        const resp = await axios.get<CourierOrdersResponse>(`${this.baseApiPath}/delivery/orders`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        })
        return resp.data
    }

    async AnswerOrder(orderId: number, answer: boolean): Promise<void> {
        await axios.post(
            `${this.baseApiPath}/delivery/orders/${orderId}`,
            {
                result: answer
            },
            {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            }
        )
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
        const response = await axios.post<MakeAnOrderResponse>(`${this.baseApiPath}/orders`, req, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
        })
        return response.data
    }

    async Orders(): Promise<OrdersResponse> {
        const resp = await axios.get<OrdersResponse>(`${this.baseApiPath}/orders`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        })
        return resp.data
    }

    async Units(): Promise<UnitsResponse> {
        const resp = await axios.get<UnitsResponse>(`${this.baseApiPath}/units`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        })
        return resp.data
    }

    async UnitById(id: number): Promise<UnitDetails> {
        const resp = await axios.get<UnitDetails>(`${this.baseApiPath}/units/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        })
        return resp.data
    }

    async Couriers(): Promise<CouriersResponse> {
        const resp = await axios.get<CouriersResponse>(`${this.baseApiPath}/couriers`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        })
        return resp.data
    }

    async CloseOrder(orderId: string): Promise<void> {
        await axios.post(`${this.baseApiPath}/orders/${orderId}/cancel`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
        })
    }

    async HireCourier(orderId: string, courierId: number): Promise<void> {
        await axios.post(`${this.baseApiPath}/couriers/${courierId}/hire?orderId=${orderId}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
        })
    }

    async CreateCourierAccount(email: string, username: string, password: string, price: number, pictureUrl: string): Promise<void> {
        await axios.post(`${this.baseApiPath}/auth/register/courier`, {
            email: email,
            username: username,
            password: password,
            price: price,
            pictureUrl: pictureUrl
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
        })
    }
}

