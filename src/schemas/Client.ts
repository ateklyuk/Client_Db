import { Schema, model } from "mongoose"

const clientSchema = new Schema({
    id: String,
    name: String,
    surname: String,
    lastname: String,
    birthdayDate: Date,
    phone: String
})

export default model("Client", clientSchema)
