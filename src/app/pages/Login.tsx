import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import FormRow from '../components/FormRow';

const Login: React.FC = () => {
	const history = useHistory();
	const [message, setMessage] = useState('');
	const [data, setData] = useState({ email: '', password: '' });

	if (localStorage.getItem('loggedIn') === 'yes') history.push('/');

	const handleClick = ({
		currentTarget,
	}: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		currentTarget.disabled = true;
		axios
			.post('/auth/login', data)
			.then(() => {
				localStorage.setItem('loggedIn', 'yes');
				location.href = '/posts';
			})
			.catch((err: AxiosError) => {
				console.error(err);
				setMessage(err.response?.data?.message);
				currentTarget.disabled = false;
			});
	};

	const { email, password } = data;
	return (
		<div className="p-3">
			<h1>Log In</h1>
			<hr />

			<Form>
				<FormRow
					data={data}
					autoFocus
					setData={setData}
					value="email"
					type="email"
					placeholder="Your email..."
					label="Email"
				/>

				<FormRow
					data={data}
					setData={setData}
					value="password"
					type="password"
					placeholder="Your password..."
					label="Password"
				/>

				<Button onClick={handleClick} disabled={!email || !password}>
					Log In
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

export default Login;
