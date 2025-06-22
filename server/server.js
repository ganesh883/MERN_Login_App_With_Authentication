import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './Database/connection.js';
import router from './router/route.js';

const app = express();

/**middleware */
app.use(express.json()); //To create a server
app.use(cors()); 
app.use(morgan('tiny'));
app.disable('x-powered-by');



/**HTTP GET Request */
app.get('/',(req,res) =>{
    res.status(201).json("Home GET Request");
});

/**API Routes */
app.use('/api', router);

const port = 8080;

/**Start Server only we have valid connection*/
connect().then(()=>{
    try{
        app.listen(port,()=>{
            console.log(`Server connected to http://localhost:${port}`);
        })
    } catch (error){
        console.log('Cannot connect to the Server')
    }
}).catch(error =>{
    console.log("Invalid database connection...!")
})
