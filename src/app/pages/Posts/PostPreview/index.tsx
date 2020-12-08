import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Post as PostPreview, User } from '../../../utils';
import './PostPreview.scss';
import axios from 'axios';
import { Heart, HeartFill } from 'react-bootstrap-icons';

interface Props {
	user: User | null;
	data: PostPreview;
}

const PostPreview: React.FC<Props> = ({
	data: { title, content, _id, image, author, likes },
	user,
}) => {
	const [deleted, setDeleted] = useState(false);
	const history = useHistory();
	const match = useRouteMatch();

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		e.currentTarget.disabled = true;

		axios
			.delete(`/api/posts/${_id}`)
			.then(() => setDeleted(true))
			.catch(err => {
				e.currentTarget.disabled = false;
				console.error(err);
			});
	};

	if (deleted) {
		return <Alert variant="success">This post has been deleted</Alert>;
	}

	return (
		<div
			onClick={() => history.push(`${match.path}/${_id}`)}
			className="post-preview px-3">
			<div className="d-flex align-items-center my-2">
				<img
					className="post-preview-avatar rounded-circle mr-2"
					src={`/api/avatar/${author._id}`}
				/>
				{author.username}
			</div>
			<h4>{title}</h4>
			{content && <p>{content}</p>}
			{image && (
				<img
					className="post-preview-image rounded mb-3 border border-secondary"
					src={`/api/posts/${_id}/image`}
				/>
			)}

			<p>
				{likes.includes(user?._id || '') ? (
					<HeartFill className="mr-2" />
				) : (
					<Heart className="mr-2" />
				)}
				{likes.length}
			</p>

			{user?._id === author._id && (
				<>
					<br />
					<Button
						onClick={handleClick}
						className="py-0 px-2"
						variant="outline-secondary">
						Delete
					</Button>
				</>
			)}
		</div>
	);
};

export default PostPreview;
