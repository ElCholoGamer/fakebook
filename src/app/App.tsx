import axios from 'axios';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import { User } from './utils';

const Header = React.lazy(() => import('./components/Header'));
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Posts = React.lazy(() => import('./pages/Posts'));
const Account = React.lazy(() => import('./pages/Account'));
const Post = React.lazy(() => import('./pages/Post'));
const CookiesFooter = React.lazy(() => import('./components/CookiesFooter'));

const App: React.FC = () => {
	const [user, setUser] = React.useState<User | null>(null);
	const [loaded, setLoaded] = React.useState(false);

	React.useEffect(() => {
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
				<Route exact path="/posts" component={Posts} />
				<Route exact path="/post" component={Post} />
				<Route exact path="/account" children={<Account user={user} />} />

				<Redirect to="/" />
			</Switch>
			<CookiesFooter />
		</React.Suspense>
	);
};

export default App;
