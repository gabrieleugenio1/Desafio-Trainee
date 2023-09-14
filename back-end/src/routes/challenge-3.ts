import {Router} from 'express';
import Challenge3Controller from '../controllers/challenge-3';
const router = Router();



 router.post('/', Challenge3Controller.index); 



export default router;