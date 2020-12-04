import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { objectsEqual, User } from '../../../utils';
import Form from 'react-bootstrap/Form';
import FormRow from '../../../components/FormRow';
import './EditAccount.scss';
import axios, { AxiosError } from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface Props {
	user: User | null;
}

const accept = ['png', 'jpg', 'jpeg'];

const EditAccount: React.FC<Props> = ({ user }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [input, setInput] = useState({ ...user! });
	const [alert, setAlert] = useState('');

	if (!user) return <Redirect to="login" />;

	const updateAvatar = () => inputRef.current?.click();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		if (!files?.length) return;

		const [type, ext] = files[0].type.split('/');
		if (type !== 'image' || !accept.includes(ext.toLowerCase())) {
			const extensions = accept.join(', ');
			return setAlert(
				`File must be an image from any of the following types: ${extensions}`
			);
		}

		const form = new FormData();
		form.append('avatar', files[0]);
		axios
			.put('/api/avatar', form, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then(() => location.reload())
			.catch((err: AxiosError) => {
				console.error(err);
				setAlert(err.response?.data?.message);
			});
	};

	const removeAvatar = () => {
		axios
			.delete('/api/avatar')
			.then(() => location.reload())
			.catch((err: AxiosError) => {
				console.error(err);
				setAlert(err.response?.data?.message);
			});
	};

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const { currentTarget } = e;
		currentTarget.disabled = true;

		axios
			.put('/api/user', input)
			.then(() => location.reload())
			.catch((err: AxiosError) => {
				currentTarget.disabled = false;
				console.error(err);
				setAlert(err.response?.data?.message);
			});
	};

	return (
		<div className="p-3">
			<h1>Edit Account</h1>
			<hr />

			{alert && <Alert variant="danger">{alert}</Alert>}

			<Form>
				<FormRow
					data={input}
					setData={setInput}
					label="Username"
					value="username"
					autoFocus
					transformer={str => str.trimStart()}
					placeholder="Your username"
				/>

				<FormRow
					data={input}
					setData={setInput}
					label="Email"
					value="email"
					disabled
					footer="SIKE, you can't change your email"
				/>

				<FormRow
					type="textarea"
					data={input}
					setData={setInput}
					label="Bio"
					value="bio"
					placeholder="Something interesting idk"
				/>

				<Button
					disabled={objectsEqual(user, input)}
					onClick={handleClick}
					variant="success">
					Save
				</Button>
			</Form>

			<hr />
			<h5>Avatar:</h5>
			<img
				id="user-avatar"
				src="/api/avatar"
				alt="Avatar"
				onClick={updateAvatar}
				className="rounded-circle"
			/>
			<br />
			<Button
				disabled={!user.avatar}
				onClick={removeAvatar}
				className="mt-3"
				variant="outline-danger">
				Remove Avatar
			</Button>

			<input
				type="file"
				className="d-none"
				ref={inputRef}
				onChange={handleChange}
				accept={accept.map(ext => `image/${ext}`).join()}
			/>
		</div>
	);
};

export default EditAccount;
