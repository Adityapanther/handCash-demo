const fastify = require('fastify')({
    logger: true
});

const dotEnv = require('dotenv');
const swagger = require('fastify-swagger');
const swaggerProperties = require("./swagger-properties")

dotEnv.config();


const authRoute = require('./routes/auth');
const paymail = require('./routes/paymail');


async function launch(){
    fastify.register(swagger, swaggerProperties)
    // fastify.register(authRoute)
    fastify.register(paymail)
    

    try {
        fastify.listen(process.env.PORT, (err, addr) =>{
            if(err){
                fastify.log.error(err);
                process.exit(1);
            }
            fastify.log.info(`server listening on ${addr}`);
    })
    } catch (error) {
        console.log(error);
        
    }

}

launch();