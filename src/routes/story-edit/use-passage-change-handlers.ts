import * as React from 'react';
import {addPassageEditors, useDialogsContext} from '../../dialogs';
import {
	deselectPassage,
	movePassages,
	Passage,
	selectPassage,
	selectPassagesInRect,
	Story
} from '../../store/stories';
import {useUndoableStoriesContext} from '../../store/undoable-stories';
import {Point, Rect} from '../../util/geometry';
import {User, useAuth0} from '@auth0/auth0-react';
import {
	isSelectClaimedResponse,
	isSelectDeleteResponse,
	isPassage,
	isSelectSuccessResponse,
	isStory,
	isSuccessResponse,
	putter
} from '../../store/stories/action-creators/intertwine-functions';
import {deletePassage} from '../../store/stories';
import {updatePassage} from '../../store/stories';

export function usePassageChangeHandlers(story: Story) {
	const selectedPassages = React.useMemo(
		() => story.passages.filter(passage => passage.selected),
		[story.passages]
	);
	const {dispatch: undoableStoriesDispatch} = useUndoableStoriesContext();
	const {dispatch: dialogsDispatch} = useDialogsContext();
	const {user} = useAuth0();
	let {sub} = user!;

	const handleDeselectPassage = React.useCallback(
		(passage: Passage) =>
			undoableStoriesDispatch(deselectPassage(story, passage)),
		[story, undoableStoriesDispatch]
	);

	const handleDragPassages = React.useCallback(
		(change: Point) => {
			// Ignore tiny drags--they're probably caused by the user moving their
			// mouse slightly during double-clicking.

			if (Math.abs(change.left) < 1 && Math.abs(change.top) < 1) {
				return;
			}

			undoableStoriesDispatch(
				movePassages(
					story,
					story.passages.reduce<string[]>(
						(result, current) =>
							current.selected ? [...result, current.id] : result,
						[]
					),
					change.left / story.zoom,
					change.top / story.zoom
				),
				selectedPassages.length > 1
					? 'undoChange.movePassages'
					: 'undoChange.movePassages'
			);
		},
		[selectedPassages.length, story, undoableStoriesDispatch]
	);

	const handleEditPassage = React.useCallback(
		(passage: Passage) =>
			dialogsDispatch(addPassageEditors(story.id, [passage.id])),
		[dialogsDispatch, story.id]
	);

	const handleSelectPassage = (passage: Passage, exclusive: boolean) => {
		fetch('http://localhost:1320/passages?id=' + passage.id, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response: Response) => response.json())
			.then((responseObject: any) => {
				if (isSelectSuccessResponse(responseObject)) {
					// if the passage is not claimed, claim it
					responseObject.data = JSON.parse(responseObject.data);
					console.log(responseObject.data);
					if (isPassage(responseObject.data)) {
						passage.user = sub!;
						passage.claimed = true;
						updatePassage(story, passage, responseObject.data);
						putter(story, passage);
						// React.useCallback(
						// 	(passage: Passage, exclusive: boolean) =>
						undoableStoriesDispatch(
							selectPassage(story, passage, exclusive, sub!)
						);
						// );
					} else {
						console.log('Malformed passage data.');
					}
				} else if (isSelectClaimedResponse(responseObject)) {
					// responseObject.data = JSON.parse(responseObject.data);
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
	};

	const handleSelectRect = React.useCallback(
		(rect: Rect, additive: boolean) => {
			// The rect we receive is in screen coordinates--we need to convert to
			// logical ones.
			const logicalRect: Rect = {
				height: rect.height / story.zoom,
				left: rect.left / story.zoom,
				top: rect.top / story.zoom,
				width: rect.width / story.zoom
			};
			// This should not be undoable.
			undoableStoriesDispatch(
				selectPassagesInRect(
					story,
					logicalRect,
					sub!,
					additive ? selectedPassages.map(passage => passage.id) : []
				)
			);
		},
		[selectedPassages, story, undoableStoriesDispatch]
	);

	return {
		handleDeselectPassage,
		handleDragPassages,
		handleEditPassage,
		handleSelectPassage,
		handleSelectRect
	};
}
