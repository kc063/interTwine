import * as React from 'react';
import {GlobalErrorBoundary} from './components/error';
import {LoadingCurtain} from './components/loading-curtain/loading-curtain';
import {LocaleSwitcher} from './store/locale-switcher';
import {PrefsContextProvider} from './store/prefs';
import {Routes} from './routes';
import {StoriesContextProvider} from './store/stories';
import {StoryFormatsContextProvider} from './store/story-formats';
import {StateLoader} from './store/state-loader';
import {ThemeSetter} from './store/theme-setter';
import 'focus-visible';
import './styles/typography.css';
import './styles/focus-visible-shim.css';
// import Auth0ProviderWithHistory from './components/auth0-provider-with-history';
import {Auth0Provider} from '@auth0/auth0-react';
import {useHistory} from 'react-router-dom';

export const App: React.FC = () => {
	const history = useHistory();
	const onRedirectCallback = (appState: any) => {
		history.push(appState?.returnTo || window.location.pathname);
	};
	const domain = process.env.REACT_APP_AUTH0_DOMAIN;
	const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
	return (
		<Auth0Provider
			domain={domain == undefined ? '' : domain}
			clientId={clientId == undefined ? '' : clientId}
			authorizationParams={{
				redirect_uri: window.location.origin,
				onRedirectCallback: onRedirectCallback
			}}
		>
			<GlobalErrorBoundary>
				<PrefsContextProvider>
					<LocaleSwitcher />
					<ThemeSetter />
					<StoryFormatsContextProvider>
						<StoriesContextProvider>
							<StateLoader>
								<React.Suspense fallback={<LoadingCurtain />}>
									<Routes />
								</React.Suspense>
							</StateLoader>
						</StoriesContextProvider>
					</StoryFormatsContextProvider>
				</PrefsContextProvider>
			</GlobalErrorBoundary>
		</Auth0Provider>
	);
};
