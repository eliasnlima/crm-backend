import { Router } from "express";
import UserController from "./controllers/UserController.js";
import SessionController from "./controllers/SessionController.js";

import auth from "./middlewares/auth.js";
import ClientController from "./controllers/ClientController.js";
import ActionController from "./controllers/ActionController.js"

import importClientsRoutes from './routes/importClient.js'

const routes = new Router()

routes.post('/user', UserController.store )
routes.get('/users', UserController.show)
routes.post('/login', SessionController.login)


routes.use(auth)

routes.use(importClientsRoutes)
routes.post('/client', ClientController.store)
routes.delete('/client/remove', ClientController.delete)
routes.get('/clients', ClientController.show)
routes.put('/client/:clientId', ClientController.update)
routes.get('/client/:clientId', ClientController.index)
routes.put('/clientStatus/:clientId', ClientController.statusClient )
routes.put('/proxInt/:clientId', ClientController.proxInt)


routes.post('/action', ActionController.store)
routes.get('/client/:clientId/actions', ActionController.index)
routes.get('/action/user', ActionController.show)

export default routes;