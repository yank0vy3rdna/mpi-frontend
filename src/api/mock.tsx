import {
    CourierOrdersResponse,
    CouriersResponse,
    Interface,
    MakeAnOrderResponse,
    OrderResponse,
    OrdersResponse,
    UnitDetails,
    UnitsResponse,
    CurrentBalanceResp,
    TradesResponse
} from "./interface";

export class mockApi implements Interface {
    async Login(username: string, password: string): Promise<string> {
        // // role USER
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMiwicm9sZSI6IlVTRVIifQ.hOQCrzSNocZajFKzxm_qLiBHHrwvIUqH4xpPchzRs_o"
        // // role OWNER
        // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMiwicm9sZSI6Ik9XTkVSIn0.k2PU54UY0Niw05RMrc-6ce70CIpL7qPhikgg6Kd4Ut0"
        // role COURIER
        //return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiQ09VUklFUiJ9.ezkuUYOjheLLueyiiWW0vdgjPuGacvKZVDb8wWC1WsA"
    }

    async CurrentBalance(): Promise<CurrentBalanceResp> {
        return {
            gold: 10,
        }
    }

    async Register(email: string, username: string, password: string): Promise<string> {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMiwicm9sZSI6IlVTRVIifQ.hOQCrzSNocZajFKzxm_qLiBHHrwvIUqH4xpPchzRs_o"
    }

    async MakeAnOrder(cart: { [id: number]: number },
        latitude: number,
        longitude: number): Promise<MakeAnOrderResponse> {
        return { success: true, courier: null, orderId: 1 }
    }

    async Couriers(): Promise<CouriersResponse> {
        return {
            couriers: [
                {
                    id: 1,
                    pictureUrl: "/img/couriers/4.webp",
                    name: "Васян",
                    price: 5,
                }
            ],
        }
    }
    async TradesTop(): Promise<TradesResponse> {
        return {
            trades: [
                {
                    id: 4,
                    name: "sulfur",
                    price: 7,
                    count: 7,
                    countAvailableToSell: 10,
                    pictureUrl: "/img/sulfur.webp"
                },
                {
                    id: 3,
                    name: "crystal",
                    price: 10,
                    count: 7,
                    countAvailableToSell: 3,
                    pictureUrl: "/img/crystal.webp"
                },
                {
                    id: 2,
                    name: "ore",
                    price: 5,
                    count: 7,
                    countAvailableToSell: 10,
                    pictureUrl: "/img/ore.webp"
                },
            ]
        }
    }
    async Trades(): Promise<TradesResponse> {
        return {
            trades: [
                {
                    id: 1,
                    name: "wood",
                    price: 3,
                    count: 7,
                    countAvailableToSell: 10,
                    pictureUrl: "/img/wood.webp"
                },
                {
                    id: 2,
                    name: "ore",
                    price: 5,
                    count: 7,
                    countAvailableToSell: 10,
                    pictureUrl: "/img/ore.webp"
                },
                {
                    id: 4,
                    name: "sulfur",
                    price: 7,
                    count: 7,
                    countAvailableToSell: 10,
                    pictureUrl: "/img/sulfur.webp"
                },
                {
                    id: 3,
                    name: "crystal",
                    price: 10,
                    count: 7,
                    countAvailableToSell: 3,
                    pictureUrl: "/img/crystal.webp"
                },
            ]
        }
    }

    async Order(id: number): Promise<OrderResponse> {
        return {
            order: {
                id: id,
                status: "заказан",
                orderTime: "2024-12-03 12:59",
                orderUnits: [],
                currentCoord: {
                    lat: 75,
                    lon: 75,
                },
                fullPath: [
                    {
                        lat: 75,
                        lon: 25,
                    },
                    {
                        lat: 50,
                        lon: 50,
                    },
                    {
                        lat: 75,
                        lon: 75,
                    },
                    {
                        lat: 90,
                        lon: 90,
                    },
                ],
                courier: null
            },
            map: {
                roads: [
                    { id: 1, points: [{ lat: 0, lon: 0 }, { lat: 100, lon: 100 }] },
                    { id: 2, points: [{ lat: 0, lon: 100 }, { lat: 100, lon: 0 }] }
                ],
                crossRoads: [
                    {
                        roadIds: [1, 2],
                        point: { lat: 50, lon: 50 }
                    }
                ]
            }
        }
    }

    async CouriersOrder(): Promise<CourierOrdersResponse> {
        return {
            order: {
                id: 1,
                status: "заказан",
                orderTime: "2024-12-03 12:59",
                orderUnits: [],
                currentCoord: {
                    lat: 75,
                    lon: 75,
                },
                fullPath: [
                    {
                        lat: 75,
                        lon: 25,
                    },
                    {
                        lat: 50,
                        lon: 50,
                    },
                    {
                        lat: 75,
                        lon: 75,
                    },
                    {
                        lat: 90,
                        lon: 90,
                    },
                ],
                courier: null
            },
            map: {
                roads: [
                    { id: 1, points: [{ lat: 0, lon: 0 }, { lat: 100, lon: 100 }] },
                    { id: 2, points: [{ lat: 0, lon: 100 }, { lat: 100, lon: 0 }] }
                ],
                crossRoads: [
                    {
                        roadIds: [1, 2],
                        point: { lat: 50, lon: 50 }
                    }
                ]
            }

        }
    }

    async AnswerOrder(orderId: number, answer: boolean): Promise<void> {

    }

    async CreateCourierAccount(email: string, username: string, password: string, price: number, pictureUrl: string): Promise<void> {
    }

    async CloseOrder(orderId: string): Promise<void> {

    }

    async HireCourier(orderId: string, courierId: number): Promise<void> {

    }

    async Orders(): Promise<OrdersResponse> {
        return {
            orders: [{
                id: 1,
                status: "заказан",
                orderTime: "2024-12-03 12:59",
                orderUnits: [],
                currentCoord: {
                    lat: 75,
                    lon: 75,
                },
                fullPath: [
                    {
                        lat: 75,
                        lon: 25,
                    },
                    {
                        lat: 50,
                        lon: 50,
                    },
                    {
                        lat: 75,
                        lon: 75,
                    },
                    {
                        lat: 90,
                        lon: 90,
                    },
                ],
                courier: null
            }]
        }
    }

    async Units(): Promise<UnitsResponse> {
        return {
            units: [
                {
                    id: 1,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 2,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 3,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 4,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 5,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 1,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 2,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 3,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 4,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 5,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 1,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 2,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 3,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 4,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 5,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 1,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 2,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 3,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 4,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 5,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 1,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 2,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 3,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 4,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 5,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 1,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 2,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 3,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 4,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 5,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 1,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 2,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 3,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 4,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 5,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 1,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 2,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 3,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 4,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 5,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 1,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 2,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 3,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 4,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 5,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 1,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 2,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 3,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 4,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
                {
                    id: 5,
                    pictureUrl: "/img/gremlin.webp",
                    name: "Гремлин обыкновенный",
                    count: 5,
                    price: 1,
                },
            ]
        }
    }

    async MakeTrade(id: number, count: number): Promise<void> {
        return
    }
    async UnitById(id: number): Promise<UnitDetails> {
        return {
            id: id,
            name: "Гремлин обыкновенный",
            pictureUrl: "/img/gremlin.webp",
            description: "Гремлины — низкорослые зеленокожие существа — подготавливаются жителями Бракады для различного неквалифицированного труда. Они очень слабы физически, но при этом многочисленны и готовы защищать своих владык. Закованы в кандалы с тяжёлыми металлическими шарами, которые также используют в качестве оружия ближнего боя.",
            count: 5,
            price: 2
        }
    }
}
