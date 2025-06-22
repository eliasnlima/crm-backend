import Client from "../models/Client.js"

class ClientController{

    async store(req, res){

        const { nome, CNPJ } = req.body
        const { user } = req.headers

        const client = await Client.create({ nome, CNPJ, user })

        return res.status(201).json({ message: "Cliente cadastrado com sucesso", client})

    }
}

export default new ClientController()