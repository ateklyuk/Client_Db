export type DataClient = {
    id: string,
    name: string,
    surname: string,
    lastname: string,
    birthdayDate: Date,
    phone: string
}
export type DataService = {
    id: string,
    title: string,
    code: string,
    price: number,
    description: string
}
export type DataVisit = {
    id: string,
    clientId: string,
    plannedDateTime: Date,
    actualDateTime: Date | null,
    visitStatus: string,
    services: string[] | null,
    computedPrice: number | null
}

export type Services = {
    title: string[],
    price: number[]
}
export type Config = {
    dbUrl: string
}