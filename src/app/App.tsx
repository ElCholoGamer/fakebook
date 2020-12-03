import axios from 'axios';
import React, { lazy, useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import { User } from './utils';

const Header = lazy(() => import('./components/Header'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Posts = lazy(() => import('./pages/Posts'));
const Account = lazy(() => import('./pages/Account'));
const AddPost = lazy(() => import('./pages/Posts/AddPost'));
const CookiesFooter = lazy(() => import('./components/CookiesFooter'));

const App: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('loggedIn') !== 'yes') {
			return setLoaded(true);
		}

		axios
			.get('/api/user')
			.then(res => setUser(res.data.user))
			.catch(err => {
				localStorage.removeItem('loggedIn');
				console.error(err);
			})
			.finally(() => setLoaded(true));
	}, []);

	if (!loaded) return <Loading />;

	return (
		<React.Suspense fallback={<Loading />}>
			<Header user={user} />
			<Switch>
				<Route exact path="/" children={<Home user={user} />} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/posts" children={<Posts user={user} />} />
				<Route exact path="/posts/add" component={AddPost} />
				<Route exact path="/account" children={<Account user={user} />} />

				<Redirect to="/" />
			</Switch>
			<CookiesFooter />
		</React.Suspense>
	);
};

export default App;
