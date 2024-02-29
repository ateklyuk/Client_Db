

// @ts-ignore
import faker from "faker"
import {DataClient, DataVisit, DataService, Services} from "./types";
import {CLIENTS_COUNT, SERVICE_COUNT, VISITS_COUNT} from "./consts";



export const clientGeneration = (): DataClient[] => {
    const arrClient: DataClient[] = []
    for (let i = 0; i < CLIENTS_COUNT; i++) {
        const client = {
            id: faker.datatype.uuid(),
            name: faker.name.firstName(),
            surname: faker.name.findName(),
            lastname: faker.name.findName(),
            birthdayDate: faker.date.past(),
            phone: faker.phone.phoneNumber()
        }
        arrClient.push(client)
    }
    return arrClient
}

export const serviceGeneration = (): DataService[] => {
    const arrService: DataService[] = []
    for (let i = 0; i < SERVICE_COUNT; i++) {
        const service: DataService = {
            id: faker.datatype.uuid(),
            title: faker.random.words(1, 3),
            code: faker.datatype.uuid(),
            price: faker.datatype.number(60000),
            description: faker.random.words(5, 15)
        }
        arrService.push(service)
    }
    return arrService
}

export const visitsGeneration = (arrClient: DataClient[], arrService: DataService[]): DataVisit[] => {
    const arrVisit: DataVisit[] = []
    const planeArray = ["Запланировал", "Посетил", "Отменил"]

    for (let i = 0; i < VISITS_COUNT; i++) {
        const status = planeArray[faker.datatype.number(2)]
        const mountServices = faker.datatype.number(arrService.length - 1)
        const services: Services = {title:[], price: []}

        for (let k = 0; k < mountServices; k++) {
            const service = arrService[faker.datatype.number(arrService.length - 1)]
            services.title.push(service.title)
            services.price.push(service.price)
        }

        const computedPrice = services.price.reduce((accum, price) => {return accum + price}, 0)
        const visiting: DataVisit = {
            id: faker.datatype.uuid(),
            clientId: arrClient[faker.datatype.number(CLIENTS_COUNT-1)].id,
            plannedDateTime: faker.date.past(),
            actualDateTime: status !== "Посетил" ? null : faker.date.recent(),
            visitStatus: status,
            services: status !== "Посетил" ? null : services.title,
            computedPrice: status !== "Посетил" ? null : computedPrice
        }
        arrVisit.push(visiting)
    }
    return arrVisit
}
