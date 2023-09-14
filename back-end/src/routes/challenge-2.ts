import {Router} from 'express';
import Challenge2Controller from '../controllers/challenge-2';
const router = Router();



 router.post('/', Challenge2Controller.index); 



export default router;