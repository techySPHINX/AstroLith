import { Server } from 'y-websocket';

const wss = new Server({
    port: 1234,
    callback: () => {
        console.log('y-websocket server running on ws://localhost:1234');
    },
});