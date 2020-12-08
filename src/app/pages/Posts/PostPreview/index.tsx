import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Post as PostPreview, User } from '../../../utils';
import './PostPreview.scss';
import { Heart, HeartFill } from 'react-bootstrap-icons';

interface Props {
	user: User | null;
	data: PostPreview;
}

const PostPreview: React.FC<Props> = ({
	data: { title, content, _id, image, author, likes },
	user,
}) => {
	const history = useHistory();
	const match = useRouteMatch();

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
		</div>
	);
};

export default PostPreview;
