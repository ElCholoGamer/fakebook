import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { User } from '../utils';

interface Props {
	user: User | null;
}

const User: React.FC<Props> = () => {
	const history = useHistory();
	const { id } = useParams<{ id: string }>();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		let mounted = true;
		const fetchUser = () =>
			axios.get(`/api/user/${id}`).then(res => setUser(res.data.user));

		fetchUser().catch((err: AxiosError) => {
			if (err.response?.status === 404) {
				history.push('/posts');
			} else {
				console.error(err);
				if (mounted) setTimeout(fetchUser, 3000);
			}
		});

		return () => {
			mounted = false;
		};
	}, [id, history]);

	if (!user) return <Loading />;

	const { username } = user;
	return (
		<div className="p-4">
			<h3>{username}'s Profile</h3>
			<hr />
		</div>
	);
};

export default User;
