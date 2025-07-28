import { Router } from 'express';
import * as githubController from '../controllers/github.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create-repo', authMiddleware.authUser, githubController.createRepo);
router.post('/commit', authMiddleware.authUser, githubController.commitChanges);
router.get('/content', authMiddleware.authUser, githubController.getRepoContent);
router.get('/branches', authMiddleware.authUser, githubController.getBranches);
router.post('/create-branch', authMiddleware.authUser, githubController.createBranch);
router.post('/pull', authMiddleware.authUser, githubController.pullChanges);

export default router;