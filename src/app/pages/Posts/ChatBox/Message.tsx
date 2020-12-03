import React from 'react';
import { ChatMessage } from '../../../utils';

interface Props {
	data: ChatMessage;
}

const Message: React.FC<Props> = ({ data: { content, author } }) => (
	<div className="chat-message border-bottom p-2">
		<h6 className="m-1">
			<a className="text-dark" href={`/account/${author._id}`}>
				{author.username}:
			</a>
		</h6>
		<p className="m-1">{content}</p>
	</div>
);

export default Message;
