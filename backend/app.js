import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import aiRoutes from './routes/ai.routes.js';
import githubRoutes from './routes/github.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
connect();


import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join-project', (projectId) => {
        socket.join(projectId);
    });

    socket.on('code-change', (data) => {
        socket.to(data.projectId).emit('code-change', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use("/ai", aiRoutes)
app.use("/github", githubRoutes)

app.get('/', (req, res) => {
    res.send('Hello World, Welcome to AstroLith!');
});

export default server; 
