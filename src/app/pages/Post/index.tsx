import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { Post as IPost, User } from '../../utils';
import './Post.scss';

interface Props {
	user: User | null;
}

const Post: React.FC<Props> = () => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();

	const [post, setPost] = useState<IPost | null>(null);

	useEffect(() => {
		let mounted = true;

		const fetchPost = () =>
			axios.get(`/api/posts/${id}`).then(res => setPost(res.data.post));

		fetchPost().catch((err: AxiosError) => {
			console.error(err);
			if (err.response?.status === 404) {
				history.push('/posts');
			} else if (mounted) {
				setTimeout(fetchPost, 3000);
			}
		});

		return () => {
			mounted = false;
		};
	}, [history, id]);

	if (!post) return <Loading />;

	const { title, image, content } = post;
	return (
		<div className="post-wrapper">
			<div className="post p-5 mx-auto my-5 rounded">
				<h4 className="mb-4">{title}</h4>
				{content && <p>{content}</p>}
				{image && (
					<img className="post-image rounded" src={`/api/posts/${id}/image`} />
				)}
			</div>
		</div>
	);
};

export default Post;
