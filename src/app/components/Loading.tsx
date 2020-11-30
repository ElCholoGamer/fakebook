import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading: React.FC = () => (
	<div
		className="d-flex justify-content-center align-items-center"
		style={{ height: '100vh' }}>
		<Spinner
			style={{ width: '3rem', height: '3rem' }}
			role="status"
			className="text-primary"
			animation="border">
			<span className="sr-only">Loading...</span>
		</Spinner>
	</div>
);

export default Loading;
