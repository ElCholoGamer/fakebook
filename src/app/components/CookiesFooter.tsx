import React from 'react';
import Button from 'react-bootstrap/Button';

const CookiesFooter: React.FC = () => {
	const [hidden, setHidden] = React.useState(
		localStorage.getItem('cookiesDismissed') === 'yes'
	);

	const handleClick = () => {
		localStorage.setItem('cookiesDismissed', 'yes');
		setHidden(true);
	};

	return (
		<footer
			style={hidden ? { display: 'none' } : {}}
			className="p-3 footer fixed-bottom bg-secondary text-light">
			This website does not use cookies to improve user experience. However,
			this footer looks cool so whatever
			<Button onClick={handleClick} className="ml-3" variant="warning">
				Bruh
			</Button>
		</footer>
	);
};

export default CookiesFooter;
