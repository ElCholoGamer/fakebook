import ws from 'ws';
import { Server } from 'http';

function initSocket(server: Server) {
	const socket = new ws.Server({ server, path: '/chat' });

	socket.on('connection', () => console.log('A socket was connected!'));
}

export default initSocket;
