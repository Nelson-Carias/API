import {Router} from "express"
import dotenv from "dotenv"
import routerRol from "./rol.routes"
import routerUser from "./user.routes"

dotenv.config()

const URL = process.env.URL 

const routes = Router()

routes.use(`${URL}/rol`, routerRol)

routes.use(`${URL}/user`, routerUser)

export default routes
