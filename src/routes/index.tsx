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
import {ProfileRoute} from './profile/profile-route';
import Loading from '../components/loading';
import {getStore} from '../store/stories/action-creators/intertwine-functions';
import {createStory, useStoriesContext} from "../store/stories";

export const Routes: React.FC = () => {
	const {prefs} = usePrefsContext();
	const {dispatch, stories} = useStoriesContext();

	// A <HashRouter> is used to make our lives easier--to load local story
	// formats, we need the document HREF to reflect where the HTML file is.
	// Otherwise we'd have to store the actual location somewhere, which will
	// differ between web and Electron contexts.
	const {isAuthenticated} = useAuth0();
	const {user} = useAuth0();
	// @ts-ignore
	console.log('isAuthenticated: ', isAuthenticated);

	React.useEffect(() => {
		if (isAuthenticated) {
			console.log("library load 1: ");
			const fetchLib = async () => {
				await getStore(user?.sub, dispatch);
			}
			fetchLib().catch(console.error);
		}
	}, [isAuthenticated]);

	const {isLoading} = useAuth0();
	if (isLoading) {
		return <Loading />;
	}

	return (
		<HashRouter>
			{isAuthenticated ? (
				<Switch>
					<Route exact path="/">
						<StoryListRoute />
					</Route>
					<Route path="/story-formats">
						<StoryFormatListRoute />
					</Route>
					<Route path="/profile">
						<ProfileRoute />
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
			) : (
				<WelcomeRoute />
			)}
		</HashRouter>
	);
};
