import * as React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {usePrefsContext} from '../store/prefs';
import {StoryFormatListRoute} from './story-format-list';
import {StoryEditRoute} from './story-edit';
import {StoryListRoute} from './story-list';
import {StoryPlayRoute} from './story-play';
import {StoryProofRoute} from './story-proof';
import {StoryTestRoute} from './story-test';
import {WelcomeRoute} from './welcome';
import {useHistory} from 'react-router-dom';
import {Auth0Provider, useAuth0} from '@auth0/auth0-react';
// import { useEffect } from "react";

const UserIndex = () => {
	const history = useHistory();

	return (
		<Auth0Provider
			domain={'dev-137vno1gmdqn84mp.us.auth0.com'}
			clientId={'6zSnFB0AFa0cCKj7lfVrFtZde1cdgz9H'}
			authorizationParams={{
				redirect_uri: window.location.origin,
				onRedirectCallback: onRedirectCallback
			}}
		>
			<Switch>
				<Route exact path="/">
					<StoryListRoute />
				</Route>
				<Route path="/story-formats">
					<StoryFormatListRoute />
				</Route>
				<Route path="/welcome">
					<WelcomeRoute />
				</Route>
				<Route path="/stories/:storyId/play">
					<StoryPlayRoute />
				</Route>
				<Route path="/stories/:storyId/proof">
					<StoryProofRoute />
				</Route>
				<Route path="/stories/:storyId/test/:passageId">
					<StoryTestRoute />
				</Route>
				<Route path="/stories/:storyId/test">
					<StoryTestRoute />
				</Route>
				<Route path="/stories/:storyId">
					<StoryEditRoute />
				</Route>
				<Route
					path="*"
					render={path => {
						console.warn(
							`No route for path "${path.location.pathname}", rendering story list`
						);
						return <StoryListRoute />;
					}}
				></Route>
			</Switch>
		</Auth0Provider>
	);
};

export default UserIndex;
