import express from 'express';
import logger from "morgan";

import userRoutes from "./routes/userRoutes"
import transactionRoutes from "./routes/transactionRoutes";


const app = express()



app.use(express.json())
app.use(logger('dev'));

//middleware
app.use('/transaction', transactionRoutes)
app.use('/user', userRoutes)

  
const port = 5000
app.listen(port, () => {
   console.log(`app running at localhost:${port}`) 
})