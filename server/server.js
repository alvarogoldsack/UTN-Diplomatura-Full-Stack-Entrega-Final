import express from 'express';
import app from './express';
import devBundle from './devBundle';
import path from 'path'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const url = process.env.MONGODB_URI || 'mongodb+srv://alvaroGoldsack:xRcDBsLUha6H2pE@cluster0.ypstc.mongodb.net/test'
const CURRENT_WORKING_DIR = process.cwd();
let port = process.env.DB_PORT || 3000; 


devBundle.compile(app); //calls the compile method from devBundle.js


// route-handling code to the Expres app to receive GET requests at /:

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
// configure the Express app to return static files from the dist folder when the requested route starts with /dist

//routes

app.listen(port, (err) =>
{if (err){
    console.log(err)
}
console.info('Servidor inciado en puerto %s.', port)
})

const conectarDB = async () => {
    try {
        // connect recibe dos parametros, primero url de conexcion, un objeto de configuracion
        await mongoose.connect(url, {});
        console.log("Conectado a MongoDB");

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

conectarDB();
// starts a server that listens on specified PORT for incoming requests.


// With this code, when the server is running, it will be able to accept requests at the
// root route and render the React view with the "Hello World" text in the browser.


