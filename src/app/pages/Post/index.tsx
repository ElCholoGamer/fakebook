import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { HeartFill, Heart } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { Post as IPost, User } from '../../utils';
import './Post.scss';

interface Props {
	user: User | null;
}

const Post: React.FC<Props> = ({ user }) => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();

	const [liking, setLiking] = useState(false);
	const [post, setPost] = useState<IPost | null>(null);

	useEffect(() => {
		let mounted = true;

		const fetchPost = () =>
			axios.get(`/api/posts/${id}`).then(res => setPost(res.data.post));

		fetchPost().catch((err: AxiosError) => {
			if (err.response?.status === 404) {
				history.push('/posts');
			} else if (mounted) {
				console.error(err);
				setTimeout(fetchPost, 3000);
			}
		});

		return () => {
			mounted = false;
		};
	}, [history, id]);

	if (!post) return <Loading />;

	const likePost = () => {
		if (!post || liking) return;
		if (!user) return alert('Log in to like posts (bruh)');

		setLiking(true);
		axios
			.put(`/api/posts/${id}/like`)
			.then(res => setPost(res.data.post))
			.catch(console.error)
			.finally(() => setLiking(false));
	};

	const deletePost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		e.currentTarget.disabled = true;

		axios
			.delete(`/api/posts/${id}`)
			.then(() => history.push('/posts'))
			.catch(err => {
				e.currentTarget.disabled = false;
				console.error(err);
			});
	};

	const { title, image, content, likes, author, createdAt } = post;
	const d = new Date(createdAt);

	const iconProps = {
		className: `mr-2${liking || !user ? '' : ' free'}`,
		onClick: likePost,
	};

	return (
		<div className="post-wrapper">
			<div className="post p-5 mx-auto my-5 rounded">
				<h4 className="mb-2">{title}</h4>
				{content && <p>{content}</p>}

				{image && (
					<img
						className="post-image rounded mt-2"
						src={`/api/posts/${id}/image`}
					/>
				)}

				<div className="my-3">
					<img
						className="rounded-circle mr-2 post-avatar"
						src={`/api/avatar/${author._id}`}
					/>
					<span>
						By{' '}
						<a className="text-dark" href={`/user/${author._id}`}>
							{author.username}
						</a>
						{'  '}| {d.getDate()}-{d.getMonth() + 1}-{d.getFullYear()}
					</span>
				</div>

				<div className="post-likes my-2">
					{likes.includes(user?._id || '') ? (
						<HeartFill {...iconProps} />
					) : (
						<Heart {...iconProps} />
					)}
					{likes.length}
				</div>

				<Button
					className="py-0 px-2 mt-2"
					onClick={deletePost}
					variant="outline-danger">
					Delete Post
				</Button>
			</div>
		</div>
	);
};

export default Post;
