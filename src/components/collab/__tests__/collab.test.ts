import {render, screen} from '@testing-library/react';
import * as React from 'react';
import {Routes} from '../../../routes';
import {createHashHistory} from 'history';
import {PrefsContext, PrefsContextProps} from '../../../store/prefs';
import {fakePrefs} from '../../../test-util';
import {
	mockStory1,
	mockStory2,
	mockStory3
} from '../../../store/stories/action-creators/intertwine-functions/mocks';
import {Auth0Provider, useAuth0} from '@auth0/auth0-react';
import '@testing-library/jest-dom';
import {Mock} from 'jest-mock';
