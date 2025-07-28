import { Octokit } from '@octokit/rest';
import projectModel from '../models/project.model.js';

export const createGitHubRepo = async (userId, projectName, githubToken, repoOwner, repoName) => {
    const octokit = new Octokit({
        auth: githubToken,
    });

    try {
        const response = await octokit.repos.createInOrg({
            org: repoOwner,
            name: repoName,
            private: true,
        });

        const project = await projectModel.findOneAndUpdate(
            { 'users.user': userId, name: projectName },
            { $set: { githubRepo: { owner: response.data.owner.login, repoName: response.data.name, branch: response.data.default_branch } } },
            { new: true }
        );

        return project;
    } catch (error) {
        console.error('Error creating GitHub repo:', error);
        throw new Error('Failed to create GitHub repository.');
    }
};

export const getRepoContent = async (owner, repoName, branch, githubToken) => {
    const octokit = new Octokit({
        auth: githubToken,
    });

    try {
        const { data } = await octokit.repos.getContent({
            owner,
            repo: repoName,
            path: '',
            ref: branch,
        });
        return data;
    } catch (error) {
        console.error('Error getting repo content:', error);
        throw new Error('Failed to get repository content.');
    }
};

export const commitFile = async (owner, repoName, filePath, content, message, branch, githubToken) => {
    const octokit = new Octokit({
        auth: githubToken,
    });

    try {
        let sha = null;
        try {
            const { data } = await octokit.repos.getContent({
                owner,
                repo: repoName,
                path: filePath,
                ref: branch,
            });
            sha = data.sha;
        } catch (error) {
            // File does not exist, so sha remains null
        }

        const response = await octokit.repos.createOrUpdateFileContents({
            owner,
            repo: repoName,
            path: filePath,
            message,
            content: Buffer.from(content).toString('base64'),
            sha,
            branch,
        });
        return response.data;
    } catch (error) {
        console.error('Error committing file:', error);
        throw new Error('Failed to commit file.');
    }
};

export const getBranches = async (owner, repoName, githubToken) => {
    const octokit = new Octokit({
        auth: githubToken,
    });

    try {
        const { data } = await octokit.repos.listBranches({
            owner,
            repo: repoName,
        });
        return data;
    } catch (error) {
        console.error('Error getting branches:', error);
        throw new Error('Failed to get branches.');
    }
};

export const createBranch = async (owner, repoName, newBranchName, baseBranchSha, githubToken) => {
    const octokit = new Octokit({
        auth: githubToken,
    });

    try {
        const response = await octokit.git.createRef({
            owner,
            repo: repoName,
            ref: `refs/heads/${newBranchName}`,
            sha: baseBranchSha,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating branch:', error);
        throw new Error('Failed to create branch.');
    }
};

export const pullChanges = async (owner, repoName, branch, githubToken) => {
    const octokit = new Octokit({
        auth: githubToken,
    });

    try {
        // This is a simplified pull. In a real scenario, you'd need to handle merges.
        // For now, it just fetches the latest content of the branch.
        const { data } = await octokit.repos.getBranch({
            owner,
            repo: repoName,
            branch,
        });
        return data;
    } catch (error) {
        console.error('Error pulling changes:', error);
        throw new Error('Failed to pull changes.');
    }
};
