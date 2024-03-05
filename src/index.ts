import {logger} from "./logger";
import { connect } from "mongoose"
import Client from "./schemas/Client"
import Service from "./schemas/Service";
import Visiting from "./schemas/Visiting";
import {clientGeneration, serviceGeneration, visitsGeneration} from "./dataFunctions"
import {config} from "./config";
const start = async (): Promise<void>=> {
    try {
        await connect(config.dbUrl)
        await Client.deleteMany({}, () => logger.debug("clients удалены"))
        await Service.deleteMany({}, () => logger.debug("service удалены"))
        await Visiting.deleteMany({}, () => logger.debug("visits удалены"))
        await fillDb()
    }
    catch (error) {
        logger.error("Ошибка", error)
    }
};
const fillDb = async (): Promise<void> => {
    const clientsData = clientGeneration()
    await Client.insertMany(clientsData)
        .then(() => logger.debug("Клиенты загружены"))
        .catch((e) => logger.error("Ошибка при загрузке клиентов", e))

    const serviceData = serviceGeneration()
    await Service.insertMany(serviceData)
        .then(() => logger.debug("Услуги загружены"))
        .catch((e) => logger.error("Ошибка при загрузке услуг", e))

    const visitsData = visitsGeneration(clientsData, serviceData)
    await Visiting.insertMany(visitsData)
        .then(() => logger.debug("Посещения загружены"))
        .catch((e) => logger.error("Ошибка при загрузке посещений", e))
}

start()
