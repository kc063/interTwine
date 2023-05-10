/**
 * variety of functions specifically for adding/removing stories
 */
import {Passage, StoriesDispatch, Story, TagColors} from "../../stories.types";
import {isSuccessResponse} from "./passage-select-intertwine-options";
import {useAuth0} from "@auth0/auth0-react";
import {updatePassage} from "../update-passage";
import {deletePassage} from "../delete-passage";
import {updateStory} from "../update-story";
import {useUndoableStoriesContext} from "../../../undoable-stories";
import {deleteStory} from "../delete-story";


/**
 * Function for creating stories.
 * @param story
 */
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
          //leaving this here for debug reasons/potential future implementations of code.
        }
        else {
          console.log("Handle error for creation:");
          console.log(responseObject);
        }})



}

/**
 * function for DELETING stories.
 * @param storyId
 */
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
          //all good!
          //leaving this here for debug reasons/potential future implementations of code.
        }
        else {
          console.log("Handle error for deletion:");
          console.log(responseObject);
        }})
}

/**
 * Function for REFRESHING the story. This updates the story on the frontend, unlike the others,
 * which simply call the backend to update what's there.
 * @param story: the story we want to update. Can be undefined!
 * @param stories: all our stories, as gathered from the component we call this in.
 * @param dispatch: a dispatch used to update stories.
 */
export function refreshStory(story: Story | undefined, stories: Story[], dispatch: StoriesDispatch) {
  if(!story) {
    console.log("Null story.");

  }
  else {
    fetch("http://localhost:3232/stories?id=" + story.id,
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
              dispatch(updateStory(stories, story, responseObject.data, story.owner));
            } else {
              console.log("Error: response was success, but data was malformed passage.")
            }
          } else if (isDeleteResponse(responseObject)) {
            console.log("Story has been deleted on backend.");
            console.log(responseObject.result);
            dispatch(deleteStory(story));
          } else {
            console.log("Error: bad response type.");
            console.log(responseObject);
          }
        })
  }
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

/**
 * type for when a deletion has been returned from the back.
 */
export interface deleteResponse{
  result: string;
}

/**
 * type for when a story is being loaded.
 */
export interface storyLoadResponse {
  result: string;
  data: Story;
}
