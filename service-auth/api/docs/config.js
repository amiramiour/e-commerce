const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "service-auth",
            version: "0.1.0",
            description:
                "This is an API application made with Express and documented with Swagger.",
        },
        contact: {
            name: "Max",
            email: "maxrichet78@gmail.com",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    
    apis: ["./docs/*.js"],
  };


module.exports = swaggerJsdoc(options);