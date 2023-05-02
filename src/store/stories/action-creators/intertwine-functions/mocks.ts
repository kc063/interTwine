/*
const mockPassage = {height: 0, highlighted: false, id: 3, left: 0, name: "MockPassage", selected: false, story: 100, tags: [], text: "Sample Text", top: 0, width: 100, claimed: false, user: ""}
const mockStory = {ifid: 0, id: 100, lastUpdate: null; name: "NewStory", passages: [], script: "", selected: false,snapToGrid: true, startPassage: "1",  storyFormat: "Harlowe",
 */

export interface Story {

  /**
   * Version of the story format that this story uses.
   */
  storyFormatVersion: string;
  /**
   * Author-created CSS associated with the story.
   */
  stylesheet: string;
  /**
   * Tags applied to the story.
   */
  tags: string[];
  /**
   * Author-specified colors for passage tags.
   */
  tagColors: TagColors;
  /**
   * Zoom level the story is displayed at.
   */
  zoom: number;
  /**
   * InterTwine Dev Tools under here.
   */

  /**
   * Owner of the story.
   */
  owner: string;
  /**
   * People who are allowed to edit the story.
   */
  editors: string[];
}
*/