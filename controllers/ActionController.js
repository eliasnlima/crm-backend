import Action from '../models/Action.js'
import Client from '../models/Client.js'

class ActionController{

    async store(req, res){

        const { titulo, descricao, client } = req.body
        const { user } = req.headers

        const client_id = await Client.findOne({ _id: client })

        if(!client_id){
            return res.json({ error: "Client não encontrado, por favor digite um ID válido!"})
        }

        try {
            const action = await Action.create({ titulo, descricao, client, user})

            return res.status(200).json({ action})
        } catch (err){
            return res.status(400).json({ error: "Erro ao adicionar nova ação!"})
        }
        
    }
}

export default new ActionController()