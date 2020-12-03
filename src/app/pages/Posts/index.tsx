import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { User } from '../../utils';
import ChatBox from './ChatBox';
import './Posts.css';

interface Props {
	user: User | null;
}

const Posts: React.FC<Props> = ({ user }) => {
	const { clientWidth } = document.body;
	const [chat, setChat] = useState(clientWidth > 800);

	return (
		<div
			id="posts-page-wrapper"
			className="d-flex flex-row justify-content-stretch">
			{(clientWidth > 500 || !chat) && (
				<div id="posts-wrapper" className="p-3">
					<h1>Latest posts</h1>
					<hr />

					<div id="posts-content" style={{ height: 1000 }}>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
						inventore laborum nam distinctio quae nobis nulla asperiores maxime
						suscipit pariatur, voluptatem, iusto quam, dolor alias accusamus
						temporibus! Assumenda, nam maxime.
					</div>
				</div>
			)}
			{chat ? (
				<ChatBox user={user} setChat={setChat} />
			) : (
				<Button
					id="chat-button"
					className="m-5"
					onClick={() => setChat(true)}
					variant="primary">
					Open Chat
				</Button>
			)}
		</div>
	);
};

export default Posts;
