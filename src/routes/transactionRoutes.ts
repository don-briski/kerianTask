import express from "express"
import { startTransaction, completeTransaction } from "../controllers/transactionController"


const router = express.Router();


router.get('/start', startTransaction)  
router.post('/complete', completeTransaction)


 export default router