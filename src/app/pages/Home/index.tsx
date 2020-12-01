import React from 'react';
import './Home.css';

const Home: React.FC = () => {
	return (
		<>
			<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
				<div className="col-md-5 p-lg-5 mx-auto my-5">
					<h1 className="display-4 font-weight-normal">Fakebook</h1>
					<p className="lead font-weight-normal">
						The tremendously vague social network absolutely no one asked for
					</p>
				</div>
				<div className="product-device box-shadow d-none d-md-block"></div>
				<div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
			</div>

			<div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
				<div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
					<div className="my-3 py-3">
						<h2 className="display-5">Create an account!</h2>
						<p className="lead">No, don't use your bank account password</p>
					</div>
					<div
						className="bg-light box-shadow mx-auto"
						style={{
							width: '80%',
							height: '300px',
							borderRadius: '21px 21px 0 0',
						}}></div>
				</div>
				<div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
					<div className="my-3 p-3">
						<h2 className="display-5">Chat with your friends!</h2>
						<p className="lead">(Not here, do that somewhere else)</p>
					</div>
					<div
						className="bg-dark box-shadow mx-auto"
						style={{
							width: '80%',
							height: '300px',
							borderRadius: '21px 21px 0 0',
						}}></div>
				</div>
			</div>

			<div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
				<div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
					<div className="my-3 p-3">
						<h2 className="display-5">Make posts about mostly anything!</h2>
						<p className="lead">
							But you can't share them anywhere else, so why though?
						</p>
					</div>
					<div
						className="bg-dark box-shadow mx-auto"
						style={{
							width: '80%',
							height: '300px',
							borderRadius: '21px 21px 0 0',
						}}></div>
				</div>
				<div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
					<div className="my-3 py-3">
						<h2 className="display-5">Go somewhere else!</h2>
						<p className="lead">I don't really care lmao</p>
					</div>
					<div
						className="bg-light box-shadow mx-auto"
						style={{
							width: '80%',
							height: '300px',
							borderRadius: '21px 21px 0 0',
						}}></div>
				</div>
			</div>
		</>
	);
};

export default Home;
