import React, { useRef, useState } from 'react';
import { User } from '../utils';
import Form from 'react-bootstrap/Form';
import { Redirect, useHistory } from 'react-router-dom';
import FormRow from '../components/FormRow';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

interface Props {
	user: User | null;
}

const AddPost: React.FC<Props> = ({ user }) => {
	const history = useHistory();
	const inputRef = useRef<HTMLInputElement>(null);
	const [input, setInput] = useState({ title: '', content: '' });

	const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const { currentTarget } = e;
		currentTarget.disabled = true;

		const { title, content } = input;
		const { files } = inputRef.current!;

		const form = new FormData();
		form.append('title', title);
		if (content) form.append('content', content);
		if (files?.length) form.append('image', files[0]);

		axios
			.post('/api/posts', form, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then(() => history.push('/posts'))
			.catch(err => {
				currentTarget.disabled = false;
				console.error(err);
			});
	};

	if (!user) return <Redirect to="/login" />;

	return (
		<div className="p-3">
			<h1>Add a post</h1>
			<hr />
			<Form>
				<FormRow
					data={input}
					setData={setInput}
					value="title"
					label="Post title"
					autoFocus
					transformer={s => s.trimStart()}
					placeholder="An interesting title (bruh)"
				/>

				<FormRow
					data={input}
					setData={setInput}
					value="content"
					label="Post content (optional)"
					type="textarea"
					rows={5}
					transformer={s => s.trimStart()}
					placeholder="You better write something decent"
				/>

				<Form.Group as={Row}>
					<Form.Label column>Attach an image (optional)</Form.Label>
					<Col sm={10}>
						<Form.Control
							accept="image/png,image/jpeg"
							type="file"
							ref={inputRef}
						/>
					</Col>
				</Form.Group>

				<hr />
				<Button onClick={handleClick} variant="success" disabled={!input.title}>
					Post
				</Button>
			</Form>
		</div>
	);
};

export default AddPost;
