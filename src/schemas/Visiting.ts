import { Schema, model } from "mongoose"

const VisitingSchema = new Schema({
    id: { type: String, unique: true, required: true },
    clientId: { type: String, required: true },
    plannedDateTime: { type: Date, required: true },
    actualDateTime: { type: Date },
    visitStatus: { type: String, required: true },
    services: [
        { type: String },
    ],
    computedPrice: { type: Number }
},  {
    timestamps: true
})

export default model("Visiting", VisitingSchema)
