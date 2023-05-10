import * as React from 'react';
import {ButtonBar} from '../../../../components/container/button-bar';
import {RenameStoryButton} from '../../../../components/story/rename-story-button';
import {Story, updateStory, useStoriesContext} from '../../../../store/stories';
import {CreateStoryButton} from './create-story-button';
import {DeleteStoryButton} from './delete-story-button';
import {DuplicateStoryButton} from './duplicate-story-button';
import {EditStoryButton} from './edit-story-button';
import {TagStoryButton} from './tag-story-button';
import {useAuth0} from "@auth0/auth0-react";

export interface StoryActionsProps {
	selectedStory?: Story;
}

export const StoryActions: React.FC<StoryActionsProps> = props => {
	const {selectedStory} = props;
	const {dispatch, stories} = useStoriesContext();
	const {user} = useAuth0();
	const {email} = user!;

	return (
		<ButtonBar>
			<CreateStoryButton />
			<EditStoryButton story={selectedStory} />
			<TagStoryButton story={selectedStory} />
			<RenameStoryButton
				existingStories={stories}
				onRename={name =>
					dispatch(updateStory(stories, selectedStory!, {name}, email))
				}
				story={selectedStory}
			/>
			<DuplicateStoryButton story={selectedStory} />
			<DeleteStoryButton story={selectedStory} />
		</ButtonBar>
	);
};
