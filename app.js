import express from 'express'
import routes from './routes.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config()

class App{
    constructor(){
        this.server = express()

        this.middlewares()
        this.routes()
        this.database()
    }

    middlewares(){
        this.server.use(cors())
        this.server.use(express.json())

        this.server.use((req, res, next) => {
            res.setHeader("Content-Type", "application/json; charset=utf-8")
            next()
        })
    }

    routes(){
        this.server.use(routes)
        
    }

    database(){
        mongoose.connect(process.env.MONGO_URL)
    }
}

export default new App().server