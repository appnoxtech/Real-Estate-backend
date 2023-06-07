import { Router } from 'express';
import userRoutes from './modules/users/routes/userRoutes'
import propertyRoutes from './modules/properties/routes/propRoutes'
import chatroomRoutes from './modules/chat/routes/routes'

const mainRouter = Router()

// add module's router here in main router


mainRouter.use(userRoutes)
mainRouter.use(propertyRoutes)

export default mainRouter
