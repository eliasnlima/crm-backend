import { Router } from "express";
import UserController from "./controllers/UserController.js";
import SessionController from "./controllers/SessionController.js";

import auth from "./middlewares/auth.js";
import ClientController from "./controllers/ClientController.js";

const routes = new Router()

routes.post('/user', UserController.store )
routes.get('/users', UserController.show)
routes.post('/login', SessionController.login)


routes.use(auth)

routes.post('/client', ClientController.store)


export default routes;