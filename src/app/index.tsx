import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

// Register service worker for offline stuff
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
	addEventListener('load', () => {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then(registration => console.log('SW registered: ', registration))
			.catch(registrationError =>
				console.error('SW registration failed: ', registrationError)
			);
	});
}
