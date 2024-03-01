

// @ts-ignore
import faker from "faker"
import {DataClient, DataVisit, DataService, Services} from "./types";

export const CLIENTS_COUNT = faker.datatype.number({ min: 10, max: 200 })
export const SERVICE_COUNT = faker.datatype.number({ min: 5, max: 10 })
export const VISITS_COUNT = faker.datatype.number({ min: 100, max: 3000 })

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
            code: faker.datatype.hexaDecimal(32),
            price: faker.datatype.number({ min: 500, max: 20000 }),
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
        const mountServices = faker.datatype.number({ min: 1, max: arrService.length - 1 })
        const services: Services = {id:[], price: 0}
        if (status === "Посетил") {
            for (let k = 0; k < mountServices; k++) {
                const service = arrService[faker.datatype.number({ min: 1, max: arrService.length - 1})]
                services.id.push(service.id)
                services.price += service.price
            }
        }

        const visiting: DataVisit = {
            id: faker.datatype.uuid(),
            clientId: arrClient[faker.datatype.number(CLIENTS_COUNT-1)].id,
            plannedDateTime: faker.date.past(),
            actualDateTime: status !== "Посетил" ? null : faker.date.recent(),
            visitStatus: status,
            services: status !== "Посетил" ? null : services.id,
            computedPrice: status !== "Посетил" ? null : services.price
        }
        arrVisit.push(visiting)
    }
    return arrVisit
}
