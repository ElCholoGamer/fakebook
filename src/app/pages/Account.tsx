import React from 'react';
import { User } from '../utils';

interface Props {
	user: User | null;
}

const Account: React.FC<Props> = ({ user }) => {
	return <div>Account component: {user?.username}</div>;
};

export default Account;
