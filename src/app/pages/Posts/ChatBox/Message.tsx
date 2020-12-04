import React from 'react';
import { ChatMessage, User } from '../../../utils';
import { Remarkable } from 'remarkable';

interface Props {
	data: ChatMessage;
	user: User | null;
}

const md = new Remarkable();
const Message: React.FC<Props> = ({ data: { content, author }, user }) => (
	<div className="chat-message border-bottom p-2">
		<h6 className="m-1">
			<a className="text-dark" href={`/account/${author._id}`}>
				{author._id === user?._id ? 'You' : user.username}:
			</a>
		</h6>
		<p
			className="m-1"
			dangerouslySetInnerHTML={{ __html: md.render(content) }}></p>
	</div>
);

export default Message;
