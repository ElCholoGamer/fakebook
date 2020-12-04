import React, { useEffect, useRef, useState } from 'react';
import { XCircleFill } from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import { ChatMessage, User } from '../../../utils';
import './ChatBox.scss';
import Message from './Message';

interface Props {
	setChat: React.Dispatch<React.SetStateAction<boolean>>;
	user: User | null;
}

const ChatBox: React.FC<Props> = ({ setChat, user }) => {
	const chatBoxRef = useRef<HTMLDivElement>(null);
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const { protocol, host } = location;
		const actualHost =
			process.env.NODE_ENV === 'development' ? 'localhost:5000' : host;

		const wsProtocol = `ws${protocol === 'https:' ? 's' : ''}:`;
		const socket = new WebSocket(`${wsProtocol}//${actualHost}/chat`);

		socket.onopen = () => {
			setLoaded(true);
			console.log('WebSocket connected!');
		};

		socket.onclose = () => setLoaded(false);

		// On message received
		socket.onmessage = ({ data }) => {
			try {
				const { content, author, id } = JSON.parse(data);
				if (typeof content !== 'string' || typeof author !== 'object') return;

				setMessages(prev => [...prev, { content, author, id } as ChatMessage]);
			} catch {} // eslint-disable-line no-empty
		};

		setSocket(socket);
		return () => socket.close();
	}, []);

	// Auto-scroll
	useEffect(() => {
		const { current: chatBox } = chatBoxRef;
		if (!chatBox) return;

		const scrollHeight = Math.max(chatBox.scrollHeight, chatBox.clientHeight);
		chatBox.scrollTop = scrollHeight - chatBox.clientHeight;
	}, [messages]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setInput(e.target.value.trimStart());

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter' || !socket || !user) return;
		setInput('');

		const data = {
			author: {
				_id: user._id.toString(),
				username: user.username,
			},
			content: input,
		};
		socket?.send(JSON.stringify(data));
	};

	return (
		<div
			id="chat-wrapper"
			className="d-flex flex-column border-left border-secondary">
			<h3 className="bg-primary p-3 text-light m-0">
				<XCircleFill
					id="chat-close"
					onClick={() => setChat(false)}
					className="mr-2"
				/>
				Live Chat
			</h3>
			{!loaded ? (
				<Spinner
					animation="border"
					variant="primary"
					className="align-self-center mt-5"
				/>
			) : (
				<>
					<div id="chat-box" ref={chatBoxRef}>
						{!messages.length ? (
							<p className="m-3 text-secondary">Welcome to the chatroom!</p>
						) : (
							messages
								.slice(Math.max(messages.length - 30, 0)) // Only show latest 30 messages
								.map(message => <Message key={message.id} data={message} />)
						)}
					</div>
					<div id="chat-input" className="bg-secondary p-2">
						<Form.Control
							value={input}
							autoFocus
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							disabled={!user?.verified}
							placeholder={
								!user
									? 'Log in to talk in the chat!'
									: !user.verified
									? 'You gotta verify your account bruh'
									: 'Say something lol'
							}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default ChatBox;
