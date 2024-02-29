import { Schema, model } from "mongoose"

const serviceSchema = new Schema({
    id: String,
    title: String,
    code: String,
    price: Number,
    description: String
})

export default model("Service", serviceSchema)
