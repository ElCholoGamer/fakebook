import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Loading from '../../components/Loading';
import { Post as IPost, User } from '../../utils';
import ChatBox from './ChatBox';
import PostPreview from './PostPreview';
import './Posts.css';

interface Props {
	user: User | null;
}

const Posts: React.FC<Props> = ({ user }) => {
	const { clientWidth } = document.body;

	const [chat, setChat] = useState(clientWidth > 800);
	const [posts, setPosts] = useState<IPost[] | null>(null);

	useEffect(() => {
		let mounted = true;

		const fetchPosts = () => {
			axios
				.get('/api/posts')
				.then(res => {
					if (mounted) setPosts(res.data.posts);
				})
				.catch(err => {
					console.error(err);
					if (mounted) setTimeout(fetchPosts, 3000);
				});
		};

		fetchPosts();
		return () => {
			mounted = false;
		};
	}, []);

	return (
		<div id="posts-page-wrapper" className="d-flex">
			{(clientWidth > 500 || !chat) && (
				<div id="posts-wrapper" className="p-3">
					<h1>Latest posts</h1>
					<hr />

					<div id="posts-content" style={{ height: 1000 }}>
						{!posts ? (
							<Loading />
						) : !posts.length ? (
							<p className="font-italic">Oh crap there are no posts yet</p>
						) : (
							posts.map(post => (
								<Fragment key={post._id}>
									<PostPreview user={user} data={post} />
									<hr />
								</Fragment>
							))
						)}
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
