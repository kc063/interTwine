import {Thunk} from 'react-hook-thunk-reducer';
import {Rect, rectsIntersect} from '../../../util/geometry';
import {
	Passage,
	StoriesState,
	Story,
	UpdatePassageAction,
	UpdatePassagesAction
} from '../stories.types';

/**
 * Deselects all passages.
 */
export function deselectAllPassages(
	story: Story
): Thunk<StoriesState, UpdatePassagesAction> {
	return dispatch => {
		const passageUpdates: Record<string, Partial<Passage>> = {};

		story.passages.forEach(passage => {
			if (passage.selected) {
				passageUpdates[passage.id] = {selected: false};
				console.log("deselected");
				console.log(passage);
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
			console.log("deselected");
			console.log(passage);
		}
	};
}

/**
 * Selects all passages.
 */
export function selectAllPassages(
	story: Story
): Thunk<StoriesState, UpdatePassagesAction> {
	return dispatch => {
		const passageUpdates: Record<string, Partial<Passage>> = {};

		story.passages.forEach(passage => {
			if (!passage.selected) {
				passageUpdates[passage.id] = {selected: true};
				console.log("selected");
				console.log(passage);
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
 */
export function selectPassage(
	story: Story,
	passage: Passage,
	exclusive: boolean
): Thunk<StoriesState, UpdatePassagesAction> {
	if (passage.story !== story.id) {
		throw new Error('This passage does not belong to this story');
	}

	return dispatch => {
		const passageUpdates: Record<string, Partial<Passage>> = {};

		if (!passage.selected) {
			passageUpdates[passage.id] = {selected: true};
			console.log("selected");
			console.log(passage);
		}

		if (exclusive) {
			story.passages.forEach(p => {
				if (p.id !== passage.id && p.selected) {
					passageUpdates[p.id] = {selected: false};
					console.log("deselected");
					console.log(passage);
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

			/**
			 * TODO: always reads as a deselect, for some reason this is the ONLY function that calls deselect?
			 */
			if (passage.selected !== selected) {
				passageUpdates[passage.id] = {selected};
				console.log("deselected");
				console.log(passage);
			}
		});

		if (Object.keys(passageUpdates).length > 0) {
			dispatch({type: 'updatePassages', passageUpdates, storyId: story.id});
		}
	};
}
