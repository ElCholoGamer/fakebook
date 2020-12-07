export interface User {
	_id: string;
	username: string;
	bio: string;
	verified: boolean;
	email: string;
	avatar: boolean;
}

interface Author {
	_id: string;
	username: string;
}

export interface Post {
	title: string;
	content?: string;
	image: boolean;
	likes: string[];
	comments: {
		author: Author;
		content: string;
	}[];
	author: Author;
	createdAt: string;
}

export interface ChatMessage {
	id: string;
	author: Author;
	content: string;
}

export function objectsEqual(obj1: any, obj2: any) {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) return false;

	return keys1.every(key => key in obj2 && obj1[key] === obj2[key]);
}
