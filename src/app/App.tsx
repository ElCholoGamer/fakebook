import React, { lazy, useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import { User } from './utils';

const Header = lazy(() => import('./components/Header'));
const CookiesFooter = lazy(() => import('./components/CookiesFooter'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Posts = lazy(() => import('./pages/Posts'));
const Account = lazy(() => import('./pages/Account'));
const EditAccount = lazy(() => import('./pages/Account/EditAccount'));
const AddPost = lazy(() => import('./pages/Posts/AddPost'));
const VerifySuccess = lazy(() => import('./pages/VerifySuccess'));

const App: React.FC = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loaded, setLoaded] = useState(false);

	const fetchUser = () =>
		axios.get('/api/user').then(res => setUser(res.data.user));

	useEffect(() => {
		if (localStorage.getItem('loggedIn') !== 'yes') {
			return setLoaded(true);
		}

		fetchUser()
			.catch(err => {
				localStorage.removeItem('loggedIn');
				console.error(err);
			})
			.finally(() => setLoaded(true));
	}, []);

	if (!loaded) return <Loading />;

	return (
		<Suspense fallback={<Loading />}>
			<Header user={user} />
			<Switch>
				<Route exact path="/" children={<Home user={user} />} />
				<Route exact path="/login" children={<Login fetchUser={fetchUser} />} />
				<Route
					exact
					path="/register"
					children={<Register fetchUser={fetchUser} />}
				/>
				<Route exact path="/posts" children={<Posts user={user} />} />
				<Route exact path="/posts/add" component={AddPost} />
				<Route exact path="/account" children={<Account user={user} />} />
				<Route
					exact
					path="/account/edit"
					children={<EditAccount fetchUser={fetchUser} user={user} />}
				/>
				<Route exact path="/verify-success" component={VerifySuccess} />

				<Redirect to="/" />
			</Switch>
			<CookiesFooter />
		</Suspense>
	);
};

export default App;
