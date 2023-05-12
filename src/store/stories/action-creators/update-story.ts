import {Story, UpdateStoryAction} from '../stories.types';
import {storyFileName} from '../../../electron/shared';
import {ownerUpdateFunction} from './intertwine-functions';

/**
 * General update of a story.
 */
export function updateStory(
	stories: Story[],
	story: Story,
	props: Partial<Story>,
	user: String | undefined,
	isRefresh: Boolean = false
): UpdateStoryAction {
	if (
		props.name &&
		stories
			.filter(s => storyFileName(s) === storyFileName({...s, ...props}))
			.some(s => s.id !== story.id)
	) {
		throw new Error(`There is already a story named "${props.name}".`);
	}
	if (!(user === story.owner)) {
		throw new Error(`You are not the owner, and can not edit that field.`);
	}
	if (!isRefresh) {
		ownerUpdateFunction(story);
	}
	return {
		props,
		storyId: story.id,
		type: 'updateStory'
	};
}
