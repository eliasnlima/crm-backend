import { Schema, model } from "mongoose";

const ClientSchema = new Schema({
    nome: { type: String, required: true},
    CNPJ: { type: String, unique: true, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    fone: String,
    email: String,
    status: {
        type: String,
        enum: ["Prospecção", "Cliente Ativo", "Reativado", "Em negociação", "Vazio"],
        default: 'Vazio'
    }
})

export default model("Client", ClientSchema)