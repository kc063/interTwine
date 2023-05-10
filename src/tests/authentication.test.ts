import '@testing-library/jest-dom';
// import {RenderResult} from '@testing-library/react';
import {Auth0Provider, useAuth0} from '@auth0/auth0-react';
import {Router} from 'react-router-dom';
import {createBrowserHistory, createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {mockStory1} from '../store/stories/action-creators/intertwine-functions/mocks';
import * as ReactDOM from 'react-dom';
import {App} from '../app';
import { PrefsContextProps } from '../store/prefs';
import { createHashHistory } from 'history';
import { PrefsContext } from '../store/prefs';
const mockedUseAuth0 = <jest.Mock>useAuth0;
jest.mock('@auth0/auth0-react');
let app: typeof App;
// let document: RenderResult;
beforeEach(() => {
    process.env.REACT_APP_NAME = 'mock-app-name';
	process.env.REACT_APP_VERSION = '1.2.3';
	// document = render(<App />);
    // app = new App();
});

/*
tests that can be done

- can an unauthenticated user access story library pages?
- can an authenticated user 
*/

jest.mock('../story-edit/story-edit-route');
jest.mock('../story-format-list/story-format-list-route');
jest.mock('../story-list/story-list-route');
jest.mock('../story-play/story-play-route');
jest.mock('../story-proof/story-proof-route');
jest.mock('../story-test/story-test-route');
jest.mock('../welcome/welcome-route');

describe('<Routes>', () => {
	function renderAtRoute(route: string, context?: Partial<PrefsContextProps>) {
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

    test('unauthenticated user cannot access story library pages', () => {
        mockedUseAuth0.mockReturnValue({
            isAuthenticated: false
            // user: {
            // 	name: 'Juan',
            // 	email: 'jc@example.com',
            // 	picture: 'https://avatar.com'
            // }
        });
        const history = createMemoryHistory();
        const endpoint = '/#/stories/a925d682-1884-4747-880f-1a1798d15ed7';
        history.push(endpoint);

        const {isAuthenticated} = mockedUseAuth0();
        expect(isAuthenticated).toBe(false);
        render(<App>);
        expect(screen.getByText('User Unauthorized.')).toBeInTheDocument();
    });

}
