import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link, useHistory } from 'react-router-dom';

const NotFound: React.FC = () => {
	const history = useHistory();

	return (
		<div className="p-3">
			<h1>404: Page not found</h1>
			<hr />
			<p>Bruh, seriously?</p>
			<br />

			<Button className="my-2" as={Link} to="/" variant="primary">
				Homepage
			</Button>
			<br />
			<Button className="my-2" onClick={() => history.goBack()}>
				Go back
			</Button>
		</div>
	);
};

export default NotFound;
