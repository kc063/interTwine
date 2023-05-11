/**
 * an assembly of functions for owner-specific updates (deleting the story, changing title, etc.)
 */

import {Story} from '../../stories.types';
import {isSuccessResponse} from './passage-select-intertwine-options';

/**
 * Multipurpose function that encapsulates ALL owner updates-- things we only want the owner
 * to be able to do. For now, everyone can do it, though! Essentially this is the "story update"
 * function for when the entire story is updated.
 * @param story
 */

export function ownerUpdateFunction(story: Story | undefined) {
	if (story) {
		console.log(JSON.stringify(story));
		fetch('http://localhost:3000/stories/' + story.id, {
			//fetch('http://localhost:1320/stories/' + story.id, {
			method: 'PUT',
			body: JSON.stringify(story),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response: Response) => response.json())
			.then((responseObject: any) => {
				if (isSuccessResponse(responseObject)) {
				} else {
					console.log('Handle error for story update:');
					console.log(responseObject);
				}
			});
	} else {
		console.log('Story was undefined.');
	}
}
