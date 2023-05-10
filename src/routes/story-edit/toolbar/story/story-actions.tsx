import * as React from 'react';
import {ButtonBar} from '../../../../components/container/button-bar';
import {RenameStoryButton} from '../../../../components/story/rename-story-button';
import {Story, updateStory, useStoriesContext} from '../../../../store/stories';
import {DetailsButton} from './details-button';
import {FindReplaceButton} from './find-replace-button';
import {JavaScriptButton} from './javascript-button';
import {PassageTagsButton} from './passage-tags-button';
import {StylesheetButton} from './stylesheet-button';
import {useAuth0} from "@auth0/auth0-react";

export interface StoryActionsProps {
	story: Story;
}

export const StoryActions: React.FC<StoryActionsProps> = props => {
	const {dispatch, stories} = useStoriesContext();
	const {story} = props;
	const {user} = useAuth0();
	const {email} = user!;

	// 			<FindReplaceButton story={story} />
	// find/replace button removed for InterTwine Testing Purposes
	return (
		<ButtonBar>
			<RenameStoryButton
				existingStories={stories}
				onRename={name => dispatch(updateStory(stories, story, {name}, email))}
				story={story}
			/>
			<DetailsButton story={story} />
			<PassageTagsButton story={story} />
			<JavaScriptButton story={story} />
			<StylesheetButton story={story} />
		</ButtonBar>
	);
};
