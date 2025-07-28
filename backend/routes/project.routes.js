import { Router } from 'express';
import { body } from 'express-validator';
import * as projectController from '../controllers/project.controller.js';
import { authUser } from '../middleware/auth.middleware.js';
import { authorizeProjectUser } from '../middleware/project.auth.middleware.js';

const router = Router();


router.post('/create',
    authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
)

router.get('/all',
    authUser,
    projectController.getAllProject
)

router.put('/add-user',
    authUser,
    body('projectId').isString().withMessage('Project ID is required'),
    body('users').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
    projectController.addUserToProject
)

router.get('/get-project/:projectId',
    authUser,
    projectController.getProjectById
)

router.put('/update-user-role',
    authUser,
    authorizeProjectUser(['owner']),
    body('projectId').isString().withMessage('Project ID is required'),
    body('userId').isString().withMessage('User ID is required'),
    body('role').isString().withMessage('Role is required'),
    projectController.updateUserRole
)

router.put('/update-file-tree',
    authUser,
    authorizeProjectUser(['owner', 'editor']),
    body('projectId').isString().withMessage('Project ID is required'),
    body('fileTree').isObject().withMessage('File tree is required'),
    projectController.updateFileTree
)


export default router;