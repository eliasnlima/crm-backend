import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

class SessionController{
    
    async login(req,res){

        const { email, password } = req.body
        
        const user = await User.findOne({email})

       if(!user || !bcrypt.compareSync(password, user.passwordHash)){
            return res.status(401).json({ error: "Email ou senha incorretos" });
       }

       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
       })

       return res.json({ user: { id: user._id, nome: user.name }, token})
    }
}

export default new SessionController()