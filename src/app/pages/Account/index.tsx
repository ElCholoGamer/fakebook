import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import { User } from '../../utils';
import { Remarkable } from 'remarkable';

interface Props {
	user: User | null;
}

const md = new Remarkable();
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
			<h5 className="mt-3">Your bio:</h5>
			<p
				className="bg-light border pt-3 px-3 border-secondary rounded"
				dangerouslySetInnerHTML={{
					__html: md.render(user.bio || '*bruh you dont have a bio*'),
				}}></p>
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
