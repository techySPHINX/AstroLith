import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: [ true, 'Project name must be unique' ],
    },

    users: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            role: {
                type: String,
                enum: ['owner', 'editor', 'viewer'],
                default: 'viewer'
            }
        }
    ],
    fileTree: {
        type: Object,
        default: {}
    },
    githubRepo: {
        owner: String,
        repoName: String,
        branch: String,
    },

})


const Project = mongoose.model('project', projectSchema)


export default Project;
