// @ts-ignore
import faker from "faker"
import {DataClient, DataVisit, DataService, Services} from "./types";

const MIN_CLIENTS_COUNT = 10
const MAX_CLIENTS_COUNT = 200
const MIN_SERVICE_COUNT = 5
const MAX_SERVICE_COUNT = 10
const MIN_VISITS_COUNT = 100
const MAX_VISITS_COUNT = 3000
const MIN_WORDS_IN_TITLE = 1
const MAX_WORDS_IN_TITLE = 3
const MIN_WORDS_IN_DESCRIPTION = 5
const MAX_WORDS_IN_DESCRIPTION = 15
const MIN_PRICE = 500
const MAX_PRICE = 20000
const CODE_LENGTH = 32

export const clients_count = faker.datatype.number({min: MIN_CLIENTS_COUNT, max: MAX_CLIENTS_COUNT})
export const service_count = faker.datatype.number({min: MIN_SERVICE_COUNT, max: MAX_SERVICE_COUNT})
export const visits_count = faker.datatype.number({min: MIN_VISITS_COUNT, max: MAX_VISITS_COUNT})

export const clientGeneration = (): DataClient[] => {
    return [...Array(clients_count)].map(() => {
        return {
            id: faker.datatype.uuid(),
            name: faker.name.firstName(),
            lastname: faker.name.findName(),
            patronymic: faker.name.findName(),
            birthday: faker.date.past(),
            phone: faker.phone.phoneNumber()
        };
    });
}

export const serviceGeneration = (): DataService[] => {
    return [...Array(service_count)].map(() => {
        return {
            id: faker.datatype.uuid(),
            title: faker.random.words(MIN_WORDS_IN_TITLE, MAX_WORDS_IN_TITLE),
            code: faker.datatype.hexaDecimal(CODE_LENGTH),
            price: faker.datatype.number({min: MIN_PRICE, max: MAX_PRICE}),
            description: faker.random.words(MIN_WORDS_IN_DESCRIPTION, MAX_WORDS_IN_DESCRIPTION)
        };
    });
}

export const visitsGeneration = (clients: DataClient[], services: DataService[]): DataVisit[] => {
    const planeTypes = ["Запланировал", "Посетил", "Отменил"]
    return [...Array(visits_count)].map(() => {
        const status = planeTypes[faker.datatype.number(planeTypes.length - 1)]
        const mountCount = faker.datatype.number({min: 1, max: services.length - 1})
        const idPriceServices: Services = {id: [], price: 0}
        if (status === "Посетил") {
            [...Array(mountCount)].forEach(() => {
                const service = services[faker.datatype.number(services.length - 1)]
                idPriceServices.id.push(service.id)
                idPriceServices.price += service.price
            })
        }
        return {
            id: faker.datatype.uuid(),
            clientId: clients[faker.datatype.number(clients_count - 1)].id,
            plannedDateTime: faker.date.past(),
            actualDateTime: status !== "Посетил" ? null : faker.date.recent(),
            visitStatus: status,
            services: status !== "Посетил" ? null : idPriceServices.id,
            computedPrice: status !== "Посетил" ? null : idPriceServices.price
        };
    });
}
