/**
 * variety of functions specifically for adding/removing editors
 */
import {Passage, Story} from "../../stories.types";
import {isSuccessResponse} from "./passage-select-intertwine-options";
import {useAuth0} from "@auth0/auth0-react";
import {updatePassage} from "../update-passage";
import {deletePassage} from "../delete-passage";
import {updateStory} from "../update-story";
import {useUndoableStoriesContext} from "../../../undoable-stories";
import {deleteStory} from "../delete-story";


const {dispatch, stories} = useUndoableStoriesContext();

export function onCreateStory(story: Story){
  console.log(JSON.stringify(story));
  //appropriate backend call
  fetch("http://localhost:3232/story",
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
  fetch("http://localhost:3232/story/" + storyId,
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
/*
export function refreshStory(story: Story){
  fetch("http://localhost:3232/passages?id=" + story.id,
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
        if (ifSuccessLoadResponse(responseObject)) {
          if (isStory(responseObject.data)) {
            console.log(responseObject.data);
            dispatch(updateStory(stories, story, responseObject.data));
          }
          else{
            console.log("Error: response was success, but data was malformed passage.")
          }
        }
        else if (isDeleteResponse(responseObject)) {
          console.log(responseObject.result);
          dispatch(deleteStory(story));
        }
        else {
          console.log("Error: bad response type for selection.");
          console.log(responseObject);
        }})
} */