import { Router } from 'express';
import userRoutes from './modules/users/routes/userRoutes';
import propertyRoutes from './modules/properties/routes/propRoutes';
import chatroomRoutes from './modules/chat/routes/chat';
import fileUploadRoutes from './modules/documentsUpload/routes/documentsUpload';
import ratingRoutes from './modules/ratings/routes/ratingRoutes'
import terms_routes from './modules/responses/routes/terms_routes';
import feedback_routes from './modules/responses/routes/feedback_routes';
import favouriteRoutes from './modules/favourite_property/routes/favouriteRoutes';

const mainRouter = Router()

// add module's router here in main router


mainRouter.use(userRoutes)
mainRouter.use(propertyRoutes)
mainRouter.use(chatroomRoutes)
mainRouter.use(fileUploadRoutes)
mainRouter.use(ratingRoutes)
mainRouter.use(terms_routes)
mainRouter.use(feedback_routes)
mainRouter.use(favouriteRoutes)

export default mainRouter
