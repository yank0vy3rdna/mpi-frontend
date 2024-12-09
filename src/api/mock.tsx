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
                    lat: 110,
                    lon: 210,
                },
                fullPath: [
                    { lat: 90, lon: 160 },
                    { lat: 110, lon: 210 },
                    { lat: 80, lon: 230 },
                    { lat: 83, lon: 280 },
                ],
                courier: null
            },
            map: {
                roads: [
                    {
                        id: 3, points: [
                            { lat: 10, lon: 90 },
                            { lat: 20, lon: 120 },
                            { lat: 90, lon: 160 },
                            { lat: 110, lon: 210 },
                            { lat: 80, lon: 230 },
                            { lat: 83, lon: 280 },
                            { lat: 105, lon: 310 },
                            { lat: 135, lon: 290 },
                            { lat: 215, lon: 320 },
                            { lat: 215, lon: 350 },
                            { lat: 290, lon: 355 },
                        ]
                    },
                    {
                        id: 4, points: [
                            { lat: 215, lon: 320 },
                            { lat: 255, lon: 300 },
                            { lat: 275, lon: 310 },
                            { lat: 365, lon: 250 },
                            { lat: 435, lon: 305 },
                            { lat: 480, lon: 305 },
                            { lat: 510, lon: 330 },
                            { lat: 490, lon: 345 },
                            { lat: 450, lon: 355 },
                            { lat: 420, lon: 355 },
                            { lat: 400, lon: 340 },
                            { lat: 360, lon: 355 },
                            { lat: 315, lon: 330 },
                        ]
                    },
                    {
                        id: 5, points: [
                            { lat: 365, lon: 250 },
                            { lat: 355, lon: 200 },
                            { lat: 375, lon: 170 },
                        ]
                    },
                    {
                        id: 6, points: [
                            { lat: 110, lon: 210 },
                            { lat: 130, lon: 215 },
                            { lat: 170, lon: 210 },
                            { lat: 200, lon: 250 },
                            { lat: 250, lon: 220 },
                            { lat: 270, lon: 170 },
                            { lat: 250, lon: 160 },
                        ]
                    },
                    {
                        id: 7, points: [
                            { lat: 170, lon: 210 },
                            { lat: 180, lon: 180 },
                            { lat: 160, lon: 150 },
                        ]
                    },
                    {
                        id: 8, points: [
                            { lat: 180, lon: 180 },
                            { lat: 200, lon: 170 },
                            { lat: 220, lon: 150 },
                            { lat: 240, lon: 100 },
                            { lat: 420, lon: 115 },
                            { lat: 460, lon: 90 },
                            { lat: 410, lon: 40 },
                            { lat: 350, lon: 50 },
                            { lat: 200, lon: 30 },
                            { lat: 180, lon: 70 },
                            { lat: 150, lon: 80 },
                            { lat: 100, lon: 130 },
                            { lat: 90, lon: 160 },
                        ]
                    },
                    {
                        id: 9,
                        points: [
                            { lat: 410, lon: 40 },
                            { lat: 460, lon: 20 },
                        ]
                    },
                    {
                        id: 10,
                        points: [
                            { lat: 150, lon: 80 },
                            { lat: 130, lon: 40 },
                            { lat: 100, lon: 10 },
                        ]
                    },
                    {
                        id: 11,
                        points: [
                            { lat: 460, lon: 90 },
                            { lat: 480, lon: 90 },
                            { lat: 520, lon: 80 },
                            { lat: 540, lon: 120 },
                            { lat: 590, lon: 140 },
                            { lat: 600, lon: 190 },
                            { lat: 530, lon: 180 },
                            { lat: 500, lon: 250 },
                            { lat: 440, lon: 230 },
                            { lat: 445, lon: 170 },
                            { lat: 480, lon: 160 },
                        ]
                    },
                    {
                        id: 12,
                        points: [
                            { lat: 600, lon: 190 },
                            { lat: 620, lon: 200 },
                            { lat: 590, lon: 300 },
                            { lat: 560, lon: 290 },
                            { lat: 510, lon: 330 },
                        ]
                    }
                ],
                crossRoads: [
                    {
                        roadIds: [3, 4],
                        point: { lat: 215, lon: 320 },
                    },
                    {
                        roadIds: [4, 5],
                        point: { lat: 365, lon: 250 },
                    },
                    {
                        roadIds: [3, 6],
                        point: { lat: 110, lon: 210 },
                    },
                    {
                        roadIds: [6, 7],
                        point: { lat: 170, lon: 210 },
                    },
                    {
                        roadIds: [7, 8],
                        point: { lat: 180, lon: 180 },
                    },
                    {
                        roadIds: [8, 9],
                        point: { lat: 410, lon: 40 },
                    },
                    {
                        roadIds: [8, 3],
                        point: { lat: 90, lon: 160 },
                    },
                    {
                        roadIds: [8, 10],
                        point: { lat: 150, lon: 80 },
                    },
                    {
                        roadIds: [8, 11],
                        point: { lat: 460, lon: 90 },
                    },
                    {
                        roadIds: [11, 12],
                        point: { lat: 600, lon: 190 },
                    },
                    {
                        roadIds: [4, 12],
                        point: { lat: 510, lon: 330 },
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
                    { id: 2, points: [{ lat: 0, lon: 100 }, { lat: 100, lon: 0 }] },
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
