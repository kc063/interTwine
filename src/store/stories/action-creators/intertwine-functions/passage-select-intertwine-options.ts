import {
	Passage,
	StoriesState,
	Story,
	UpdatePassageAction,
	UpdatePassagesAction
} from '../../stories.types';
import {Thunk} from 'react-hook-thunk-reducer';
import {useAuth0} from '@auth0/auth0-react';
import {updatePassage} from '../update-passage';
import {useUndoableStoriesContext} from '../../../undoable-stories';
import {deletePassage} from '../delete-passage';
import * as React from 'react';
import {ownerUpdateFunction} from './owner-update-intertwine';

/**
 * function to run when passage is SELECTED.
 * @param story
 * @param passage
 */
export async function onSelectPassage(
	story: Story,
	passage: Passage,
	user: string
) {
	fetch('http://localhost:3232/passages?id=' + passage.id, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((response: Response) => response.json())
		.then((responseObject: any) => {
			if (isSelectSuccessResponse(responseObject)) {
				responseObject.data = JSON.parse(responseObject.data);
				console.log(responseObject.data);
				if (isPassage(responseObject.data)) {
					passage.user = user;
					passage.claimed = true;
					updatePassage(story, passage, responseObject.data);
					putter(story, passage);
				} else {
					console.log('Malformed passage data.');
				}
			} else if (isSelectClaimedResponse(responseObject)) {
				if (isPassage(responseObject.data)) {
					console.log(responseObject.data);
					updatePassage(story, passage, responseObject.data);
				} else {
					console.log(
						'Error: response was claimed, but data was malformed passage.'
					);
				}
			} else if (isSelectDeleteResponse(responseObject)) {
				console.log(responseObject.result);
				deletePassage(story, passage);
			} else {
				console.log('Error: bad response type for selection.');
				console.log(responseObject);
			}
		});
}

/**
 * function to run when passage is DESELECTED.
 * @param story
 * @param passage
 */
export function onDeselectPassage(story: Story, passage: Passage) {
	passage.claimed = false;
	passage.user = '';
	putter(story, passage);
}

/**
 * "putting" function for updates, used for deselect as well as other updaters.
 * @param story
 * @param passage
 */
export function putter(story: Story, passage: Passage) {
	console.log(JSON.stringify(passage));
	fetch('http://localhost:3232/passages/' + passage.id, {
		method: 'PUT',
		body: JSON.stringify(passage),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((response: Response) => response.json())
		.then((responseObject: any) => {
			if (isSuccessResponse(responseObject)) {
				//all good!
			} else {
				console.log('Handle error for update.');
				console.log(responseObject);
			}
		});
}

/**
 * function to run when CREATING A NEW PASSAGE
 * @param story
 * @param passage
 */
export function onCreatePassage(story: Story, passage: Passage) {
	//appropriate backend call
	fetch('http://localhost:3232/passages', {
		method: 'POST',
		body: JSON.stringify(passage),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((response: Response) => response.json())
		.then((responseObject: any) => {
			if (isSuccessResponse(responseObject)) {
				ownerUpdateFunction(story);
			} else {
				console.log('Handle error for creation.');
				console.log(responseObject);
			}
		});
}

/**
 * function to run when DELETING the existing passage
 * @param story
 * @param passage
 * @param exclusive
 */
export function onDeletePassage(story: Story, passageId: string) {
	//appropriate backend call
	fetch('http://localhost:3232/passages/' + passageId, {
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'DELETE'
	})
		.then((response: Response) => response.json())
		.then((responseObject: any) => {
			if (isSuccessResponse(responseObject)) {
				ownerUpdateFunction(story);
			} else {
				console.log('Handle error for deletion:');
				console.log(responseObject);
			}
		});
}

//*** NARROWERS ***/

/**
 * Returns  if select success response is selectful and successful.
 * @param rjson the json to check
 * @returns whether the format is that of a successful response
 */
function isSelectSuccessResponse(rjson: any): rjson is selectSuccessResponse {
	if (!('result' in rjson)) return false;
	if (rjson['result'] === 'success') {
		if (!('data' in rjson)) return false;
	} else {
		return false;
	}
	return true;
}

/**
 * Returns if select response is claimed.
 * @param rjson the json to check
 * @returns whether the format is that of a claim response.
 */
function isSelectClaimedResponse(rjson: any): rjson is selectClaimedResponse {
	if (!('result' in rjson)) return false;
	if (rjson['result'] === 'error_claimed') {
		if (!('data' in rjson)) return false;
		return true;
	} else {
		return false;
	}
}

/**
 * Returns if select response is deletion.
 * @param rjson the json to check
 * @returns whether the format is that of a claim response.
 */
function isSelectDeleteResponse(rjson: any): rjson is selectDeleteResponse {
	if (!('result' in rjson)) return false;
	if (rjson['result'] === 'error_datasource') {
		return true;
	}
	return false;
}

/**
 * response for if passage can be successfully selected!
 * @param rjson
 */
export function isSuccessResponse(rjson: any): rjson is successResponse {
	if (!('result' in rjson)) return false;
	if (rjson['result'] === 'success') {
		return true;
	}
	return false;
}

/**
 * Returns whether rjson matches the json format of the Passage type.
 *
 * @param rjson the json to check
 * @returns whether the format is that of a successful response
 */
export function isPassage(rjson: any): rjson is Passage {
	if (!('height' in rjson)) return false;
	if (!('highlighted' in rjson)) return false;
	if (!('id' in rjson)) return false;
	if (!('left' in rjson)) return false;
	if (!('name' in rjson)) return false;
	if (!('selected' in rjson)) return false;
	if (!('story' in rjson)) return false;
	if (!('tags' in rjson)) return false;
	if (!('text' in rjson)) return false;
	if (!('top' in rjson)) return false;
	if (!('width' in rjson)) return false;
	if (!('claimed' in rjson)) return false;
	if (!('user' in rjson)) return false;
	return true;
}
/**
 * Returns whether rjson matches the json format of the Passage type.
 *
 * @param rjson the json to check
 * @returns whether the format is that of a successful response
 */
export function isStory(rjson: any): rjson is Story {
	if (!('ifid' in rjson)) return false;
	if (!('lastUpdate' in rjson)) return false;
	if (!('id' in rjson)) return false;
	if (!('passages' in rjson)) return false;
	if (!('name' in rjson)) return false;
	if (!('script' in rjson)) return false;
	if (!('selected' in rjson)) return false;
	if (!('snapToGrid' in rjson)) return false;
	if (!('startPassage' in rjson)) return false;
	if (!('storyFormat' in rjson)) return false;
	if (!('storyFormatVersion' in rjson)) return false;
	if (!('stylesheet' in rjson)) return false;
	if (!('tags' in rjson)) return false;
	if (!('tagColors' in rjson)) return false;
	if (!('zoom' in rjson)) return false;
	if (!('owner' in rjson)) return false;
	if (!('editors' in rjson)) return false;
	return true;
}

/**
 * interface for success response on select
 */
interface selectSuccessResponse {
	result: string;
	data: string;
}

/**
 * interface for claimed response on select
 */
interface selectClaimedResponse {
	result: string;
	data: Passage;
}

/**
 * interface for deleted response on select
 */
interface selectDeleteResponse {
	result: string;
}

/**
 * interface for success response, more generally
 */
export interface successResponse {
	result: string;
}
