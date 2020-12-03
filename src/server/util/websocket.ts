import WebSocket from 'ws';
import { Server } from 'http';
import { hashSync } from 'bcrypt';

function initSocket(server: Server) {
	const socket = new WebSocket.Server({ server, path: '/chat' });

	socket.on('connection', ws => {
		ws.on('message', data => {
			try {
				const message = JSON.parse(data.toString());
				message.id = hashSync(data.toString(), 1);

				socket.clients.forEach(client => client.send(JSON.stringify(message)));
			} catch {} // eslint-disable-line no-empty
		});
	});
}

export default initSocket;
