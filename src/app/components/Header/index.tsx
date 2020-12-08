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
import './Header.scss';
import { Link } from 'react-router-dom';

interface Props {
	user: User | null;
	fetchUser(): Promise<void>;
}

/**
 * I got absolutely no idea how,
 * but apparently this thing works.
 */
// eslint-disable-next-line react/display-name
const CustomToggle = forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
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

const Header: React.FC<Props> = ({ user, fetchUser }) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.currentTarget.disabled = true;
		axios
			.post('/auth/logout')
			.then(() => {
				localStorage.removeItem('loggedIn');
				return fetchUser();
			})
			.catch(console.error);
	};

	return (
		<>
			<Navbar id="header" fixed="top" bg="dark" variant="dark" expand="sm">
				<Navbar.Brand as={Link} to="/">
					Fakebook
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-between">
					<Nav>
						<NavItem>
							<NavLink as={Link} to="/posts">
								Posts
							</NavLink>
						</NavItem>
						{user?.verified && (
							<NavItem>
								<NavLink as={Link} to="/addpost">
									<PencilFill />
								</NavLink>
							</NavItem>
						)}
					</Nav>
					{user ? (
						<Navbar.Text className="p-0">
							<Dropdown alignRight className="d-inline">
								<Dropdown.Toggle as={CustomToggle} variant="primary">
									{user.username}
								</Dropdown.Toggle>

								<Dropdown.Menu className="bg-dark">
									<Dropdown.Item as={Link} to="/account">
										My Account
									</Dropdown.Item>
									<Dropdown.Item className="text-danger" onClick={handleClick}>
										Log Out
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Navbar.Text>
					) : (
						<ButtonGroup>
							<Button variant="primary" as={Link} to="/login">
								Log In
							</Button>
							<Button variant="primary" as={Link} to="/register">
								Register
							</Button>
						</ButtonGroup>
					)}
				</Navbar.Collapse>
			</Navbar>

			<div id="header-offset"></div>
		</>
	);
};

export default Header;
