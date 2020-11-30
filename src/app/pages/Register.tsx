import axios, { AxiosError } from 'axios';
import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import FormRow from '../components/FormRow';

const Register: React.FC = () => {
	const history = useHistory();
	const [message, setMessage] = React.useState('');
	const [data, setData] = React.useState({
		email: '',
		username: '',
		password1: '',
		password2: '',
	});

	if (localStorage.getItem('loggedIn') === 'yes') history.push('/');

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
				currentTarget.disabled = false;
			});
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
			{message && (
				<Alert variant="danger" className="mt-3">
					{message}
				</Alert>
			)}
		</div>
	);
};

export default Register;
