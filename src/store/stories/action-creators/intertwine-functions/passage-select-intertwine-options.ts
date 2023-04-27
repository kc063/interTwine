import {Passage, Story} from "../../stories.types";


/**
 * function to run when passage is SELECTED.
 * @param story
 * @param passage
 * @param exclusive
 */
export function onSelectPassage(story: Story,
    passage: Passage,
    exclusive: boolean){

}

/**
 * function to run when passage is DESELECTED.
 * @param story
 * @param passage
 * @param exclusive
 */
export function onDeselectPassage(story: Story,
                                passage: Passage,
                                exclusive: boolean){

}

/**
 * function to run when CREATING A NEW PASSAGE
 * @param story
 * @param passage
 * @param exclusive
 */
export function onNewPassage(story: Story, passage: Passage, exclusive: boolean){

}

/**
 * function to run when DELETING the existing passage
 * @param story
 * @param passage
 * @param exclusive
 */
export function onDeletePassage(story: Story, passage: Passage, exclusive: boolean){

}