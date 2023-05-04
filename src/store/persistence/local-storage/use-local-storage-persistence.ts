import * as React from 'react';
import * as prefs from './prefs';
import * as stories from './stories';
import * as storyFormats from './story-formats';
import {libload} from "../../stories/action-creators/intertwine-functions";


export function useLocalStoragePersistence() {
	return React.useMemo(
		() => ({
			prefs: {
				load: prefs.load,
				saveMiddleware: prefs.saveMiddleware
			},
			stories: {
				load: stories.load,
				//load: libload(sub),
				saveMiddleware: stories.saveMiddleware
			},
			storyFormats: {
				load: storyFormats.load,
				saveMiddleware: storyFormats.saveMiddleware
			}
		}),
		[]
	);
}
