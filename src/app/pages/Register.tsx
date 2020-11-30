import axios, { AxiosError } from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import FormRow from '../components/FormRow';

const Register: React.FC = () => {
	const [message, setMessage] = React.useState('');
	const [data, setData] = React.useState({
		email: '',
		username: '',
		password1: '',
		password2: '',
	});

	const handleClick = ({
		currentTarget,
	}: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// Validate passwords
		const { password1, password2, username, email } = data;
		if (password1 !== password2) {
			return setMessage("The passwords don't match");
		}

		currentTarget.disabled = true;
		axios
			.post('/auth/register', { username, email, password: password1 })
			.then(() => {
				localStorage.setItem('loggedIn', 'yes');
				location.href = '/';
			})
			.catch((err: AxiosError) => {
				console.error(err);
				setMessage(err.response?.data?.message);
			})
			.finally(() => (currentTarget.disabled = false));
	};

	return (
		<div className="p-3">
			<h1>Register</h1>
			<hr />

			<Form>
				<FormRow
					data={data}
					value="email"
					placeholder="Your email..."
					setData={setData}
					type="email"
					label="Email"
				/>

				<FormRow
					data={data}
					value="username"
					placeholder="Your username..."
					setData={setData}
					label="Username"
				/>

				<FormRow
					data={data}
					value="password1"
					placeholder="Your password..."
					setData={setData}
					type="password"
					label="Password"
				/>

				<FormRow
					data={data}
					value="password2"
					placeholder="Your password (again)..."
					setData={setData}
					type="password"
					label="Password (again)"
				/>

				<Button
					onClick={handleClick}
					disabled={Object.values(data).some(v => !v.trim())}>
					Register
				</Button>
			</Form>
			<p className="text-danger mt-3">{message}</p>
		</div>
	);
};

export default Register;
