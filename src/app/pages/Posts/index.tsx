import React from 'react';
import ChatBox from './ChatBox';
import './Posts.css';

const Posts: React.FC = () => {
	return (
		<div id="posts-page-wrapper" className="d-flex flex-row">
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
			<ChatBox />
		</div>
	);
};

export default Posts;
