import {Thunk} from 'react-hook-thunk-reducer';
import {Rect, rectsIntersect} from '../../../util/geometry';
import {
	Passage,
	StoriesState,
	Story,
	UpdatePassageAction,
	UpdatePassagesAction
} from '../stories.types';
import {onDeselectPassage, onSelectPassage} from './intertwine-functions';
import {StoriesActionOrThunk} from '../../undoable-stories';
import {Dispatch} from 'react';

/**
 * Deselects all passages.
 * Should not fail for any reason.
 */
export function deselectAllPassages(
	story: Story,
	user: string,
	d: Thunk<StoriesState, UpdatePassageAction>
): Thunk<StoriesState, UpdatePassagesAction> {
	return dispatch => {
		const passageUpdates: Record<string, Partial<Passage>> = {};

		story.passages.forEach(passage => {
			if (passage.selected) {
				passageUpdates[passage.id] = {selected: false};
				console.log('deselected');
				onDeselectPassage(story, passage);
			}
		});

		if (Object.keys(passageUpdates).length > 0) {
			dispatch({
				passageUpdates,
				type: 'updatePassages',
				storyId: story.id
			});
		}
	};
}

/**
 * Deselects a single passage.
 * Should not fail.
 */
export function deselectPassage(
	story: Story,
	passage: Passage
): Thunk<StoriesState, UpdatePassageAction> {
	if (passage.story !== story.id) {
		throw new Error('This passage does not belong to this story');
	}

	return dispatch => {
		if (passage.selected) {
			dispatch({
				type: 'updatePassage',
				passageId: passage.id,
				props: {selected: false},
				storyId: story.id
			});
			console.log('deselected');
			onDeselectPassage(story, passage);
		}
	};
}

/**
 * Selects all passages.
 * Disabled for InterTwine purposes, effectively called by nothing.
 */
export function selectAllPassages(
	story: Story,
	user: string
): Thunk<StoriesState, UpdatePassagesAction> {
	return dispatch => {
		const passageUpdates: Record<string, Partial<Passage>> = {};

		story.passages.forEach(passage => {
			if (!passage.selected) {
				passageUpdates[passage.id] = {selected: true};
				console.log('selected');
				onSelectPassage(story, passage, user);
			}
		});

		if (Object.keys(passageUpdates).length > 0) {
			dispatch({
				passageUpdates,
				type: 'updatePassages',
				storyId: story.id
			});
		}
	};
}

/**
 * Selects a single passage.
 * Can fail.
 */
export function selectPassage(
	story: Story,
	passage: Passage,
	exclusive: boolean,
	user: string
): Thunk<StoriesState, UpdatePassagesAction> {
	console.log(user);
	if (passage.story !== story.id) {
		throw new Error('This passage does not belong to this story');
	}

	return dispatch => {
		const passageUpdates: Record<string, Partial<Passage>> = {};

		if (!passage.selected) {
			//if(onSelectPassage)
			passageUpdates[passage.id] = {selected: true};
			onSelectPassage(story, passage, user);
			console.log('selected');
		}

		if (exclusive) {
			story.passages.forEach(p => {
				if (p.id !== passage.id && p.selected) {
					passageUpdates[p.id] = {selected: false};
					onDeselectPassage(story, p);
					console.log('deselected');
				}
			});
		}

		if (Object.keys(passageUpdates).length > 0) {
			dispatch({type: 'updatePassages', passageUpdates, storyId: story.id});
		}
	};
}

export function selectPassagesInRect(
	story: Story,
	rect: Rect,
	user: string,
	ignoreIds: string[] = []
): Thunk<StoriesState, UpdatePassagesAction> {
	return dispatch => {
		const passageUpdates: Record<string, Partial<Passage>> = {};

		story.passages.forEach(passage => {
			if (ignoreIds.find(r => r === passage.id)) {
				// We are ignoring this passage, e.g. this is an additive selection and it
				// was already selected.
				return;
			}

			const selected = rectsIntersect(rect, passage);

			if (passage.selected !== selected) {
				passageUpdates[passage.id] = {selected};
				onDeselectPassage(story, passage);
				console.log('deselected');
			}
		});

		if (Object.keys(passageUpdates).length > 0) {
			dispatch({type: 'updatePassages', passageUpdates, storyId: story.id});
		}
	};
}
