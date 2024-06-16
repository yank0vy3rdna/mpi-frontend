import API, {MakeAnOrderRequest, MakeAnOrderResponse, OrdersResponse, UnitDetails, UnitsResponse} from "./api";

export class mockApi implements API {
    async Login(username: string, password: string): Promise<string> {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxMjM0NTY3ODkwMCIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.yVb5XmnTwe0RQkDZp9ZW0-EgPoxoYb-rPD3wQxIvv_w"
    }

    async MakeAnOrder(cart: { [id: number]: number },
                      latitude: number,
                      longitude: number): Promise<MakeAnOrderResponse> {
        return {success: true}
    }

    async Orders(): Promise<OrdersResponse> {
        return {
            orders: [{
                id: 1,
                status: "заказан",
                orderTime: "2024-12-03 12:59",
                orderUnits: []
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
                }
            ]
        }
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