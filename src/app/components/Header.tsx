import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Navbar from 'react-bootstrap/Navbar';
import { User } from '../utils';

interface Props {
	user: User | null;
}

const Header: React.FC<Props> = ({ user }) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.currentTarget.disabled = true;
		axios
			.post('/user/logout')
			.then(() => location.reload())
			.catch(console.error);
	};

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Navbar.Brand href="/">Coolness100</Navbar.Brand>
			<Navbar.Toggle />

			<Navbar.Collapse className="justify-content-end">
				{user ? (
					<>
						<Navbar.Text>
							Logged in as:{' '}
							<a href="/account" className="text-light font-weight-bold">
								{user.username}
							</a>
						</Navbar.Text>
						<Button
							onClick={handleClick}
							className="ml-3"
							variant="outline-danger">
							Log Out
						</Button>
					</>
				) : (
					<ButtonGroup>
						<Button variant="primary" href="/login">
							Log In
						</Button>
						<Button variant="primary" href="/register">
							Register
						</Button>
					</ButtonGroup>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
