import { Schema, model } from "mongoose"

const ClientSchema = new Schema({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    patronymic: { type: String },
    birthday: { type: Date },
    phone: { type: String }
},  {
    timestamps: true
})

export default model("Client", ClientSchema)
