import User from '../models/User.js'

class UserController{

    async store(req, res){

        const { name, email, password } = req.body

        const user = await User.create({ name, email, password})

        return res.status(201).json(user)

    }

    async show(req, res){

        const user = await User.find()

        return res.json(user)
    }

}

export default new UserController()