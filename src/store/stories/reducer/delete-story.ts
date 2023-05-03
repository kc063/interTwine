import {StoriesState} from '../stories.types';
import {onDeleteStory} from "../action-creators/intertwine-functions";

export function deleteStory(state: StoriesState, storyId: string) {
	let deleted = false;
	const newState = state.filter(story => {
		if (story.id === storyId) {
			deleted = true;
			onDeleteStory(storyId);
			return false;
		}
		return true;
	});

	if (!deleted) {
		console.warn(
			`Asked to delete a story with ID "${storyId}", but it does not exist in state`
		);
		return state;
	}

	return newState;
}
