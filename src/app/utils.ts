export interface User {
	_id: string;
	username: string;
	bio: string;
	verified: boolean;
}

export interface ChatMessage {
	id: string;
	author: {
		_id: string;
		username: string;
	};
	content: string;
}
