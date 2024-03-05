import { Schema, model } from "mongoose"

const ServiceSchema = new Schema({
    id: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    price: { type: Number },
    description: { type: String },
},  {
    timestamps: true
})

export default model("Service", ServiceSchema)
