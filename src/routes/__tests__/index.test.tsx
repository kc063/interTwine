import {render, screen} from '@testing-library/react';
import * as React from 'react';
import {Routes} from '..';
import {createHashHistory} from 'history';
import {PrefsContext, PrefsContextProps} from '../../store/prefs';
import {fakePrefs} from '../../test-util';
import {
	mockStory1,
	mockStory2,
	mockStory3
} from '../../store/stories/action-creators/intertwine-functions/mocks';
import {Auth0Provider, useAuth0} from '@auth0/auth0-react';
import '@testing-library/jest-dom';
import {Mock} from 'jest-mock';

jest.mock('@auth0/auth0-react');
jest.mock('../story-edit/story-edit-route');
jest.mock('../story-format-list/story-format-list-route');
jest.mock('../story-list/story-list-route');
jest.mock('../story-play/story-play-route');
jest.mock('../story-proof/story-proof-route');
jest.mock('../story-test/story-test-route');
jest.mock('../welcome/welcome-route');
jest.mock('../welcome/unauthorized');

describe('<Routes>', () => {
	function renderAtRoute(route: string, context?: Partial<PrefsContextProps>) {
		// const mockedUseAuth0 = <jest.mock> useAuth0;
		const history = createHashHistory();

		history.push(route);
		return render(
			<PrefsContext.Provider
				value={{
					dispatch: jest.fn(),
					prefs: fakePrefs({welcomeSeen: true}),
					...context
				}}
			>
				<Routes />
			</PrefsContext.Provider>
		);
	}

	describe('unauthenticated user cannot access story library pages', () => {
		// const mockedUseAuth0: typeof useAuth0 = ;
		it('shows the unauthorized page no matter the route', () => {
			(useAuth0 as jest.Mock).mockReturnValue({
				isAuthenticated: false
			});
			renderAtRoute('/stories/' + mockStory1.id, {
				dispatch: jest.fn()
			});
			expect(screen.getByTestId('mock-unauthorized')).toBeInTheDocument();
		});
	});

	describe('unauthenticated user is shown the welcome page', () => {
		// const mockedUseAuth0: typeof useAuth0 = ;
		it('shows the welcome page at root', () => {
			(useAuth0 as jest.Mock).mockReturnValue({
				isAuthenticated: false
			});
			renderAtRoute('/' + mockStory1.id, {
				dispatch: jest.fn()
				// prefs: fakePrefs({welcomeSeen: false})
			});
			expect(screen.getByTestId('mock-welcome-route')).toBeInTheDocument();
		});
	});

	describe('unauthenticated user cannot any page than the welcome page no matter the route', () => {
		(useAuth0 as jest.Mock).mockReturnValue({
			isAuthenticated: false
		});
		it('shows the unauthorized page when unauthenticated user tries to access stories', () => {
			renderAtRoute('/stories/' + mockStory1.id, {
				dispatch: jest.fn()
				// prefs: fakePrefs({welcomeSeen: false})
			});
			expect(screen.getByTestId('mock-unauthorized')).toBeInTheDocument();
		});

		it('shows the unauthorized page when unauthenticated user tries to access/story-formats', () => {
			renderAtRoute('/story-formats');
			expect(screen.getByTestId('mock-unauthorized')).toBeInTheDocument();
		});

		it('shows the unauthorized page when unauthenticated user tries to access /stories/:id/play', () => {
			renderAtRoute('/stories/' + mockStory1.id + '/play');
			expect(screen.getByTestId('mock-unauthorized')).toBeInTheDocument();
		});

		it('shows the unauthorized page when unauthenticated user tries to access /stories/:id/proof', () => {
			renderAtRoute('/stories/' + mockStory1.id + '/proof');
			expect(screen.getByTestId('mock-unauthorized')).toBeInTheDocument();
		});

		it('shows the unauthorized page when unauthenticated user tries to access /stories/:id/test', () => {
			renderAtRoute('/stories/' + mockStory1.id + '/test');
			expect(screen.getByTestId('mock-unauthorized')).toBeInTheDocument();
		});

		it('shows the unauthorized page when unauthenticated user tries to access /stories/:storyId/test/:passageId', () => {
			renderAtRoute(
				'/stories/' + mockStory1.id + '/test/' + mockStory2.passages[0]
			);
			expect(screen.getByTestId('mock-unauthorized')).toBeInTheDocument();
		});

		it('shows the unauthorized page when unauthenticated user tries to access /welcome', () => {
			renderAtRoute('/welcome');
			expect(screen.getByTestId('mock-welcome-route')).toBeInTheDocument();
		});

		it('renders the welcome page for unknown routes', () => {
			jest.spyOn(console, 'warn').mockReturnValue();
			renderAtRoute('/unknown-route');
			expect(screen.getByTestId('mock-welcome-route')).toBeInTheDocument();
		});
	});

	describe('an authenticated user can access any of the valid routes', () => {
		(useAuth0 as jest.Mock).mockReturnValue({
			isAuthenticated: false,
			user: {
				name: 'Juan',
				email: 'jc@example.com',
				picture: 'https://avatar.com'
			}
		});

		it('shows the right page when an authenticated user tries to access a story', () => {
			renderAtRoute('/stories/' + mockStory3.id, {
				dispatch: jest.fn()
				// prefs: fakePrefs({welcomeSeen: false})
			});
			expect(screen.getByTestId('mock-story-edit-route')).toBeInTheDocument();
		});

		it('shows the story formats page when an authenticated user tries to access/story-formats', () => {
			renderAtRoute('/story-formats');
			expect(
				screen.getByTestId('mock-story-format-list-route')
			).toBeInTheDocument();
		});

		it('shows the play story page when an authenticated user tries to access /stories/:id/play', () => {
			renderAtRoute('/stories/' + mockStory3.id + '/play');
			expect(
				screen.getByTestId('mock-story-format-list-route')
			).toBeInTheDocument();
		});

		it('shows the story proof page when an authenticated user tries to access /stories/:id/proof', () => {
			renderAtRoute('/stories/' + mockStory3.id + '/proof');
			expect(screen.getByTestId('mock-story-proof-route')).toBeInTheDocument();
		});

		it('shows the story test page when an authenticated user tries to access /stories/:id/test', () => {
			renderAtRoute('/stories/' + mockStory3.id + '/test');
			expect(screen.getByTestId('mock-story-test-route')).toBeInTheDocument();
		});

		it('shows the  when unauthenticated user tries to access /stories/:storyId/test/:passageId', () => {
			renderAtRoute(
				'/stories/' + mockStory3.id + '/test/' + +mockStory3.passages[0]
			);
			expect(screen.getByTestId('mock-unauthorized')).toBeInTheDocument();
		});

		it('shows the unauthorized page when unauthenticated user tries to access a story that they do not own', () => {
			renderAtRoute('/stories/' + mockStory2.id);
			expect(screen.getByTestId('mock-unauthorized')).toBeInTheDocument();
		});

		it('renders the welcome page for unknown routes', () => {
			jest.spyOn(console, 'warn').mockReturnValue();
			renderAtRoute('/unknown-route');
			expect(screen.getByTestId('mock-story-list-route')).toBeInTheDocument();
		});
	});
});
