import axios from 'axios';
import React, { forwardRef } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Navbar from 'react-bootstrap/Navbar';
import { User } from '../../utils';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { PencilFill } from 'react-bootstrap-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import './Header.css';

interface Props {
	user: User | null;
}

interface RefProps {
	onClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}

/**
 * I got absolutely no idea how,
 * but apparently this thing works.
 */
// eslint-disable-next-line react/display-name
const CustomToggle = forwardRef<HTMLSpanElement, RefProps>(
	({ children, onClick }, ref) => (
		<span
			id="account-toggle"
			className="text-light font-weight-bold"
			onClick={onClick}
			ref={ref}>
			{children}
			<img
				src="/api/avatar"
				className="rounded-circle mx-2"
				width={50}
				height={50}
			/>
		</span>
	)
);

const Header: React.FC<Props> = ({ user }) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.currentTarget.disabled = true;
		axios
			.post('/auth/logout')
			.then(() => {
				localStorage.removeItem('loggedIn');
				location.reload();
			})
			.catch(console.error);
	};

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Navbar.Brand href="/">Fakebook</Navbar.Brand>
			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-between">
				<Nav>
					<NavItem>
						<NavLink href="/posts">Posts</NavLink>
					</NavItem>
					{user && (
						<NavItem>
							<NavLink href="/posts/add">
								<PencilFill />
							</NavLink>
						</NavItem>
					)}
				</Nav>
				{user ? (
					<Navbar.Text className="p-0">
						<Dropdown className="d-inline">
							<Dropdown.Toggle as={CustomToggle} variant="primary">
								{user.username}
							</Dropdown.Toggle>

							<Dropdown.Menu className="bg-dark">
								<Dropdown.Item href="/account">My Account</Dropdown.Item>
								<Dropdown.Item className="text-danger" onClick={handleClick}>
									Log Out
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Navbar.Text>
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
