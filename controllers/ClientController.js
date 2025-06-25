import Client from "../models/Client.js"
import Action from "../models/Action.js"

class ClientController{

    async show(req, res){
        
        const { userId } = req.params

        const clients = await Client.find({ user: userId})

        return res.json({clients})

    }

    async store(req, res){

        const { nome, CNPJ } = req.body
        const { user } = req.headers

        const client = await Client.create({ nome, CNPJ, user })

        return res.status(201).json({ message: "Cliente cadastrado com sucesso", client})

    }

    async delete(req, res){

        const { clientId } = req.body


        const action = await Action.deleteMany({ client: clientId})
        const client = await Client.findByIdAndDelete({ _id: clientId })

        return res.json({ message: "Cliente removido com sucesso!"})

    }

    async update(req, res){

        const { clientId } = req.params
        const { nome, CNPJ } = req.body

        const client = await Client.updateOne({ _id: clientId}, {
            nome,
            CNPJ
        })

        return res.json({ message: "Atualizado!"})
    }
}

export default new ClientController()