/**
 * variety of functions specifically for adding/removing editors
 */
import {Passage, StoriesDispatch, Story, TagColors} from "../../stories.types";
import {isSuccessResponse} from "./passage-select-intertwine-options";
import {useAuth0} from "@auth0/auth0-react";
import {updatePassage} from "../update-passage";
import {deletePassage} from "../delete-passage";
import {updateStory} from "../update-story";
import {useUndoableStoriesContext} from "../../../undoable-stories";
import {deleteStory} from "../delete-story";


export function onCreateStory(story: Story){
  console.log(JSON.stringify(story));
  //appropriate backend call
  fetch("http://localhost:3232/stories",
      {
        method: 'POST',
        body: JSON.stringify(story),
        headers: {
          'Content-Type': 'application/json',
        },
      }
  )
  .then((response: Response) => response.json())
  .then(
      (responseObject: any) => {
        if (isSuccessResponse(responseObject)) {
          //all good!
        }
        else {
          console.log("Handle error for creation.");
          console.log(responseObject);
        }})



}

export function onDeleteStory(storyId: string){
  //appropriate backend call
  fetch("http://localhost:3232/stories/" + storyId,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }
  )
  .then((response: Response) => response.json())
  .then(
      (responseObject: any) => {
        if (isSuccessResponse(responseObject)) {
        }
        else {
          console.log("Handle error for deletion:");
          console.log(responseObject);
        }})
}

//gotta make some new types lol

export function refreshStory(story: Story, stories: Story[], dispatch: StoriesDispatch) {
  fetch("http://localhost:3232/stories/" + story.id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
  )
  .then((response: Response) => response.json())
  .then(
      (responseObject: any) => {
        if (isStoryLoadResponse(responseObject)) {
          if (isStory(responseObject.data)) {
            console.log(responseObject.data);
            dispatch(updateStory(stories, story, responseObject.data));
          } else {
            console.log("Error: response was success, but data was malformed passage.")
          }
        } else if (isDeleteResponse(responseObject)) {
          console.log(responseObject.result);
          dispatch(deleteStory(story));
        } else {
          console.log("Error: bad response type for selection.");
          console.log(responseObject);
        }
      })
}


/**
 * Returns if select response is claimed.
 * @param rjson the json to check
 * @returns whether the format is that of a claim response.
 */
function isDeleteResponse(rjson: any): rjson is deleteResponse {
  if (!("result" in rjson)) return false;
  if (rjson["result"] === "error_datasource") {
    return true;
  }
  return false;
}

/**
 * Returns if select response is claimed.
 * @param rjson the json to check
 * @returns whether the format is that of a claim response.
 */
function isStoryLoadResponse(rjson: any): rjson is storyLoadResponse {
  if (!("result" in rjson)) return false;
  if (!("data" in rjson)) return false;
  return true;
}

/**
 * Returns whether rjson matches the json format of the expected redlining
 * server success response.
 *
 * @param rjson the json to check
 * @returns whether the format is that of a successful response
 */
export function isStory(rjson: any): rjson is Story {
  if (!('ifid' in rjson)) return false;
  if (!('id' in rjson)) return false;
  if (!('lastUpdate' in rjson)) return false;
  if (!('name' in rjson)) return false;
  if (!('passages' in rjson)) return false;
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

export interface deleteResponse{
  result: string;
}

export interface storyLoadResponse {
  result: string;
  data: Story;
}
