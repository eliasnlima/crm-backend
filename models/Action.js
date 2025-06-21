import { Schema, model } from "mongoose";

const ActionSchema = new Schema({
    titulo: String,
    descricao: String,
    date: { type: Date, default: Date.now},
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }
})

export default model("Action", ActionSchema)