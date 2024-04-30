import express from 'express';
import cors from 'cors';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import {ApplicationError} from './src/error-handler/applicationError.js'
import userRouter from './src/features/user/user.routes.js';

const server = express();


server.use(cors());
server.use(express.json()) 




// For all requests related to user, redirect to user routes
server.use("/api/users", userRouter);


server.use((err,req,res,next)=>{
    
    //for application error
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }

    // log error to the logger file

    //for server errors
    res.status(500).send("Something went wrong please try later")

})


server.use((req,res)=>{
    res.status(404).send("API not found");
})


server.listen(4000, ()=>{
    console.log("Server is running at 4000");
    connectUsingMongoose();
});