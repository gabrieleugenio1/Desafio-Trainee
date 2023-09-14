import {Router} from 'express';
import Challenge4Controller from '../controllers/challenge-4';
const router = Router();



 router.post('/', Challenge4Controller.index); 



export default router;