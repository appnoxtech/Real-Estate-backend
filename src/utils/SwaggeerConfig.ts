import swaggerJSDoc from "swagger-jsdoc";


//for user routes
export const userSwaggerOptions = {
    definition:{
        openApi:'3.0.0',
        info:{
            title:'User Api',
            version:'1.0.0',
            description:'Api documentation for User operation',
        },
    },
    apis:['./src/modules/users/routes/userRoutes.ts']
};
//for properties
export const propertiesSwaggerOptions = {
    definition:{
        openApi:'3.0.0',
        info:{
            title:'Properties Api',
            version:'1.0.0',
            description:'Api documentation for Properties operation',
        },
    },
    apis:['./src/modules/properties/routes/propRoutes.ts']
};
//for favourite
export const favouriteSwaggerOptions = {
    definition:{
        openApi:'3.0.0',
        info:{
            title:'Favourite Api',
            version:'1.0.0',
            description:'Api documentation for Favourite operation',
        },
    },
    apis:['./src/modules/favourite_property/routes/favouriteRoutes.ts']
};
//for rating and reviews
export const ratingSwaggerOptions = {
    definition:{
        openApi:'3.0.0',
        info:{
            title:'Ratings Api',
            version:'1.0.0',
            description:'Api documentation for Ratings operation',
        },
    },
    apis:['./src/modules/ratings/routes/ratingRoutes.ts']
};
//for documentUpload
export const documentSwaggerOptions = {
    definition:{
        openApi:'3.0.0',
        info:{
            title:'Documents Api',
            version:'1.0.0',
            description:'Api documentation for Documents operation',
        },
    },
    apis:['./src/modules/documentsUpload/routes/documentsUpload.ts']
};

//for feedback 
export const feedbackSwaggerOptions = {
    definition:{
        openApi:'3.0.0',
        info:{
            title:'Feedback Api',
            version:'1.0.0',
            description:'Api documentation for Feedback operation',
        },
    },
    apis:['./src/modules/responses/routes/feedback_routes.ts']
};
//for terms and condition
export const termsSwaggerOptions = {
    definition:{
        openApi:'3.0.0',
        info:{
            title:'Terms Api',
            version:'1.0.0',
            description:'Api documentation for terms operation',
        },
    },
    apis:['./src/modules/responses/routes/terms_routes.ts']
};


export const userSwaggerSpec = swaggerJSDoc(userSwaggerOptions);
export const propertySwaggerSpec = swaggerJSDoc(propertiesSwaggerOptions)
export const favouriteSwaggerSpec = swaggerJSDoc(favouriteSwaggerOptions)
export const ratingSwaggerSpec = swaggerJSDoc(ratingSwaggerOptions)
export const documentsSwaggerSpec = swaggerJSDoc(documentSwaggerOptions)
export const termsSwaggerSpec = swaggerJSDoc(termsSwaggerOptions)





