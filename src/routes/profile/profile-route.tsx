import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';
// import {Loading} from '../components';
// import withAuthenticationRequired from "@auth0/auth0-react";
import {StoryListToolbar} from '../story-list/toolbar';
import {useTranslation} from 'react-i18next';
import {useStoriesContext} from '../../store/stories';
import {Story} from '../../store/stories';
import {RouteToolbar} from '../../components/route-toolbar';
import {StorageQuota} from '../../components/storage-quota/storage-quota';

export interface ProfileToolbarProps {
	selectedStories: Story[];
	// showProf: boolean;
	// showStoryNav: boolean;
}

export const InnerProfileRoute: React.FC = () => {
	const {user} = useAuth0();
	const name = user?.name;
	const picture = user?.picture;
	const email = user?.email;

	return (
		<Container className="mb-5">
			<div>
				<div className="row align-items-center profile-header">
					<div className="col-md-2 mb-3">
						<img
							src={picture}
							alt="Profile"
							className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
						/>
					</div>
					<div className="col-md text-center text-md-left">
						<h2>{name}</h2>
						<p className="lead text-muted">{email}</p>
					</div>
				</div>
				<div className="row">
					<pre className="col-12 text-light bg-dark p-4">
						{JSON.stringify(user, null, 2)}
					</pre>
				</div>
			</div>
		</Container>
	);
};
export const ProfileRoute = () => {
	const {stories} = useStoriesContext();
	const {t} = useTranslation();
	return (
		<div className="story-list-route">
			{/* <RouteToolbar
				pinnedControls={<StorageQuota watch={stories} />}
				tabs={{
					[t('common.story')]: <StoryActions selectedStory={selectedStory} />,
					[t('routes.storyList.library')]: <LibraryActions />,
					[t('common.build')]: <BuildActions story={selectedStory} />,
					[t('common.view')]: <ViewActions />,
					[t('common.appName')]: <AppActions />
				}}
			/> */}
			{/* <StoryListToolbar selectedStories={selectedStories} /> */}
			{/* <InnerProfileRoute /> */}
		</div>
	);
};

// export default withAuthenticationRequired(Profile, {
// 	onRedirecting: () => <Loading />
// });
