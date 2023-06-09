import { Router } from 'express';
import userRoutes from './modules/users/routes/userRoutes';
import propertyRoutes from './modules/properties/routes/propRoutes';
import chatroomRoutes from './modules/chat/routes/chat';
import fileUploadRoutes from './modules/documentsUpload/routes/documentsUpload';
import ratingRoutes from './modules/review&ratings/routes/ratingRoutes'

const mainRouter = Router()

// add module's router here in main router


mainRouter.use(userRoutes)
mainRouter.use(propertyRoutes)
mainRouter.use(chatroomRoutes)
mainRouter.use(fileUploadRoutes)
mainRouter.use(ratingRoutes)

export default mainRouter
