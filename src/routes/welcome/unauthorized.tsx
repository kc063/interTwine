import React from 'react';
import {Link} from 'react-router-dom';
// import PageNotFound from '../assets/images/PageNotFound';
class NotFoundPage extends React.Component {
	render() {
		return (
			<div>
				{/* <img src={PageNotFound} /> */}
				<p style={{textAlign: 'center'}}>
					User Unauthorized. Click <Link to="/">here</Link> to go back.
				</p>
			</div>
		);
	}
}
export default NotFoundPage;
