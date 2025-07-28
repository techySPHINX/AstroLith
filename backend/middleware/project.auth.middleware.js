import projectModel from '../models/project.model.js';

export const authorizeProjectUser = (roles) => {
    return async (req, res, next) => {
        try {
            const { projectId } = req.body;
            const user = req.user;

            const project = await projectModel.findById(projectId);

            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const projectUser = project.users.find(u => u.user.toString() === user._id.toString());

            if (!projectUser) {
                return res.status(403).json({ message: 'User is not a member of this project' });
            }

            if (!roles.includes(projectUser.role)) {
                return res.status(403).json({ message: 'User does not have the required role' });
            }

            next();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
};