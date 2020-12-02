import React from 'react';
import { User } from '../../utils';

interface Props {
	user: User | null;
}

const Post: React.FC<Props> = () => {
	return <div>Post component</div>;
};

export default Post;
