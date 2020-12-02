import React from 'react';
import Form from 'react-bootstrap/Form';
import './ChatBox.css';

const ChatBox: React.FC = () => {
	return (
		<div
			id="chat-wrapper"
			className="d-flex flex-column border-left border-secondary">
			<h3 className="bg-primary p-3 text-light m-0">Live Chat</h3>
			<div id="chat-box">
				{[
					[
						'JoeMama',
						'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
					],
					[
						'JoeMama',
						'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore quae, ex facilis sed est',
					],
					['Ligma', 'Lorem ipsum dolor sit amet'],
				].map(i => (
					<div key="" className="chat-message border-bottom p-2">
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
