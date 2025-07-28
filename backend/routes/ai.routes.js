import { Router } from 'express';
import * as aiController from '../controllers/ai.controller.js';
const router = Router();

router.get('/get-result', aiController.getResult)
router.post('/code-completion', aiController.codeCompletion);
router.post('/debug-code', aiController.debugCode);
router.post('/review-code', aiController.reviewCode);


export default router;
