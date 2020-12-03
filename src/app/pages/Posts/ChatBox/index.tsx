import React, { useEffect } from 'react';
import { XCircleFill } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import './ChatBox.scss';

interface Props {
	setChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatBox: React.FC<Props> = ({ setChat }) => {
	useEffect(() => {
		const host =
			process.env.NODE_ENV === 'development' ? 'localhost:5000' : location.host;
		const socket = new WebSocket(`ws://${host}/chat`);
		socket.onopen = () => console.log('WebSocket connected!');
	}, []);

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
			<div id="chat-box">
				{/* Placeholder text */}
				{[
					[
						'PersonOnTheInternet',
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nostrum, repellendus ',
					],
					[
						'JoeMama',
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quae, ex facilis sed est, corrupti neque aspernatur quaerat dolor illo dolorum.',
					],
					['PersonOnTheInternet', 'Bruh'],
				].map(i => (
					<div
						key={JSON.stringify(i)}
						className="chat-message border-bottom p-2">
						<h6 className="m-1">{i[0]}:</h6>
						<p className="m-1">{i[1]}</p>
					</div>
				))}
			</div>
			<div id="chat-input" className="bg-secondary p-2">
				<Form.Control placeholder="Say something lol" />
			</div>
		</div>
	);
};

export default ChatBox;
