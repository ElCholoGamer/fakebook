import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { User } from '../../utils';
import './Home.css';

interface Props {
	user: User | null;
}

const sectionStyle: React.CSSProperties = {
	width: '80%',
	height: '300px',
	borderRadius: '21px 21px 0 0',
};

const Home: React.FC<Props> = ({ user }) => (
	<>
		<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
			<div className="product-device box-shadow d-none d-md-block"></div>
			<div className="product-device product-device-2 box-shadow d-none d-md-block"></div>
			<Col md={5} className="p-lg-5 mx-auto my-5">
				<h1 className="display-4 font-weight-normal">Fakebook</h1>
				<p className="lead font-weight-normal">
					The tremendously vague social network absolutely no one asked for
				</p>
				{user && (
					<Button variant="info" href="/posts">
						Go to Posts
					</Button>
				)}
			</Col>
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
				<div className="bg-dark box-shadow mx-auto" style={sectionStyle}></div>
			</div>
		</div>

		<div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
			<div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
				<div className="my-3 p-3">
					<h2 className="display-5">Make posts about mostly anything!</h2>
					<p className="lead">
						But you can't share them anywhere else, so why bother?
					</p>
				</div>
				<div className="bg-dark box-shadow mx-auto" style={sectionStyle}></div>
			</div>
			<div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
				<div className="my-3 py-3">
					<h2 className="display-5">Go do something else!</h2>
					<p className="lead">Don't waste your time here ;)</p>
				</div>
				<div className="bg-light box-shadow mx-auto" style={sectionStyle}></div>
			</div>
		</div>
	</>
);

export default Home;
