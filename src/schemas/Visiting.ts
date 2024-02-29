import { Schema, model } from "mongoose"

const visitingSchema = new Schema({
    id: String,
    clientId: String,
    plannedDateTime: Date,
    actualDateTime: Date,
    visitStatus: String,
    services: [
        String
    ],
    computedPrice: Number
})

export default model("Visiting", visitingSchema)
