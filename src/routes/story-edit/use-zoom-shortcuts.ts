import {useHotkeys} from 'react-hotkeys-hook';
import {Story, updateStory, useStoriesContext} from '../../store/stories';
import {useAuth0} from "@auth0/auth0-react";

export function useZoomShortcuts(story: Story) {
	const {dispatch, stories} = useStoriesContext();

	useHotkeys(
		'-',
		() => {
			switch (story.zoom) {
				case 1:
					dispatch(updateStory(stories, story, {zoom: 0.6}, story.owner));
					break;
				case 0.6:
					dispatch(updateStory(stories, story, {zoom: 0.3}, story.owner));
					break;
				// Do nothing if zoom is 0.3
			}
		},
		{keydown: false, keyup: true},
		[dispatch, stories, story]
	);
	useHotkeys(
		'=',
		() => {
			switch (story.zoom) {
				case 0.3:
					dispatch(updateStory(stories, story, {zoom: 0.6}, story.owner));
					break;
				case 0.6:
					dispatch(updateStory(stories, story, {zoom: 1}, story.owner));
					break;
				// Do nothing if zoom is 1
			}
		},
		{keydown: false, keyup: true},
		[dispatch, stories, story]
	);
}
