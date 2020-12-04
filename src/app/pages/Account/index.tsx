import React from 'react';
import Alert from 'react-bootstrap/esm/Alert';
import Button from 'react-bootstrap/esm/Button';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import { User } from '../../utils';

interface Props {
	user: User | null;
}

const Account: React.FC<Props> = ({ user }) => {
	const match = useRouteMatch();
	if (!user) return <Redirect to="/login" />;

	return (
		<div className="p-3">
			<h1>Your Account</h1>
			<hr />
			{!user.verified && (
				<Alert variant="danger">
					Your account is not verified. Check your email for verification
					instructions.
				</Alert>
			)}
			<img
				src="/api/avatar"
				id="user-avatar"
				className="rounded-circle m-2"
				width={128}
				alt="Avatar"
			/>
			<br />
			<span className="font-weight-bold">Username:</span> {user.username}
			<br />
			<span className="font-weight-bold">Email:</span> {user.email}
			<br />
			<Button
				as={Link}
				className="mt-4"
				variant="primary"
				to={`${match.path}/edit`}>
				Edit Account
			</Button>
		</div>
	);
};

export default Account;
