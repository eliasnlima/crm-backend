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
    }

    routes(){
        this.server.use(routes)
    }

    database(){
        mongoose.connect(process.env.MONGO_URL)
    }
}

export default new App().server