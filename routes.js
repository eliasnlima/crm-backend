import { Router } from "express";
import UserController from "./controllers/UserController.js";
import SessionController from "./controllers/SessionController.js";

const routes = new Router()

routes.post('/user', UserController.store )
routes.get('/users', UserController.show)
routes.post('/login', SessionController.login)

export default routes;