import axios, { AxiosError } from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormRow from '../components/FormRow';

const Login: React.FC = () => {
	const [message, setMessage] = React.useState('');
	const [data, setData] = React.useState({ email: '', password: '' });

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setData(prev => ({ ...prev, [target.name]: target.value }));
	};

	const handleClick = ({
		currentTarget,
	}: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		currentTarget.disabled = true;
		axios
			.post('/auth/login', data)
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

	const { email, password } = data;
	return (
		<div className="p-3">
			<h1>Log In</h1>
			<hr />

			<Form>
				<FormRow
					data={data}
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
			<p className="text-danger mt-3">{message}</p>
		</div>
	);
};

export default Login;
