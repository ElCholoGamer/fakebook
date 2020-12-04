import React from 'react';
import { Link } from 'react-router-dom';

const VerifySuccess: React.FC = () => {
	return (
		<div className="p-3">
			<h1>Account verified!</h1>
			<hr />
			<Link to="/">Home</Link>
			<br />
			<Link to="/posts">Posts</Link>
		</div>
	);
};

export default VerifySuccess;
