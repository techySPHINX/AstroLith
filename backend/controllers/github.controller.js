import * as githubService from '../services/github.service.js';
import userModel from '../models/user.model.js';
import projectModel from '../models/project.model.js';

export const createRepo = async (req, res) => {
    try {
        const { projectName, githubToken, repoOwner, repoName } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const project = await githubService.createGitHubRepo(loggedInUser._id, projectName, githubToken, repoOwner, repoName);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const commitChanges = async (req, res) => {
    try {
        const { projectId, filePath, content, message } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const project = await projectModel.findById(projectId);

        if (!project || !project.githubRepo) {
            return res.status(400).json({ message: 'Project not linked to GitHub.' });
        }

        // Assuming githubToken is stored with the user or passed securely
        const githubToken = loggedInUser.githubToken; // You'll need to add this to your user model

        const commitResult = await githubService.commitFile(
            project.githubRepo.owner,
            project.githubRepo.repoName,
            filePath,
            content,
            message,
            project.githubRepo.branch,
            githubToken
        );
        res.status(200).json(commitResult);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getRepoContent = async (req, res) => {
    try {
        const { projectId } = req.query;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const project = await projectModel.findById(projectId);

        if (!project || !project.githubRepo) {
            return res.status(400).json({ message: 'Project not linked to GitHub.' });
        }

        const githubToken = loggedInUser.githubToken;

        const content = await githubService.getRepoContent(
            project.githubRepo.owner,
            project.githubRepo.repoName,
            project.githubRepo.branch,
            githubToken
        );
        res.status(200).json(content);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBranches = async (req, res) => {
    try {
        const { projectId } = req.query;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const project = await projectModel.findById(projectId);

        if (!project || !project.githubRepo) {
            return res.status(400).json({ message: 'Project not linked to GitHub.' });
        }

        const githubToken = loggedInUser.githubToken;

        const branches = await githubService.getBranches(
            project.githubRepo.owner,
            project.githubRepo.repoName,
            githubToken
        );
        res.status(200).json(branches);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createBranch = async (req, res) => {
    try {
        const { projectId, newBranchName, baseBranchSha } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const project = await projectModel.findById(projectId);

        if (!project || !project.githubRepo) {
            return res.status(400).json({ message: 'Project not linked to GitHub.' });
        }

        const githubToken = loggedInUser.githubToken;

        const branch = await githubService.createBranch(
            project.githubRepo.owner,
            project.githubRepo.repoName,
            newBranchName,
            baseBranchSha,
            githubToken
        );
        res.status(201).json(branch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const pullChanges = async (req, res) => {
    try {
        const { projectId } = req.body;
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const project = await projectModel.findById(projectId);

        if (!project || !project.githubRepo) {
            return res.status(400).json({ message: 'Project not linked to GitHub.' });
        }

        const githubToken = loggedInUser.githubToken;

        const pulledContent = await githubService.pullChanges(
            project.githubRepo.owner,
            project.githubRepo.repoName,
            project.githubRepo.branch,
            githubToken
        );
        res.status(200).json(pulledContent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};